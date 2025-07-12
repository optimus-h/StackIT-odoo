const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://damjblvjydemncjmwqpy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbWpibHZqeWRlbW5jam13cXB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMxMTkwMCwiZXhwIjoyMDY3ODg3OTAwfQ.8H2Xn91TFXrCnGnzjQuPJkJ8iFTq0AAlSaVJ6izTP-I'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testRegistration() {
  console.log('🔍 Testing user registration flow...')
  
  try {
    // Generate a unique test email
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'testpassword123'
    const testFullName = 'Test User'
    const testUsername = `testuser-${Date.now()}`

    console.log(`📧 Testing registration with email: ${testEmail}`)

    // Step 1: Create user account
    console.log('\n📋 Step 1: Creating user account...')
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: {
        full_name: testFullName,
        username: testUsername
      }
    })

    if (authError) {
      console.log(`❌ User creation failed: ${authError.message}`)
      return
    } else {
      console.log(`✅ User created successfully: ${authData.user.id}`)
    }

    // Step 2: Check if profile was created automatically
    console.log('\n📋 Step 2: Checking if profile was created...')
    await new Promise(resolve => setTimeout(resolve, 2000)) // Wait for trigger

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      console.log(`❌ Profile not found: ${profileError.message}`)
      console.log('💡 The trigger might not be working. Creating profile manually...')
      
      // Create profile manually
      const { data: manualProfile, error: manualError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: testEmail,
          full_name: testFullName,
          username: testUsername,
          role: 'user'
        })
        .select()
        .single()

      if (manualError) {
        console.log(`❌ Manual profile creation failed: ${manualError.message}`)
      } else {
        console.log(`✅ Manual profile creation successful: ${manualProfile.id}`)
      }
    } else {
      console.log(`✅ Profile created automatically: ${profile.id}`)
      console.log(`   Email: ${profile.email}`)
      console.log(`   Name: ${profile.full_name}`)
      console.log(`   Username: ${profile.username}`)
    }

    // Step 3: Test login
    console.log('\n📋 Step 3: Testing login...')
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    })

    if (loginError) {
      console.log(`❌ Login failed: ${loginError.message}`)
    } else {
      console.log(`✅ Login successful: ${loginData.user.id}`)
    }

    // Step 4: Clean up (delete test user)
    console.log('\n📋 Step 4: Cleaning up test user...')
    const { error: deleteError } = await supabase.auth.admin.deleteUser(authData.user.id)
    
    if (deleteError) {
      console.log(`❌ User deletion failed: ${deleteError.message}`)
    } else {
      console.log('✅ Test user deleted successfully')
    }

    console.log('\n🎉 Registration test complete!')
    console.log('\n📋 Results:')
    console.log('- If user creation failed: Check Supabase Auth settings')
    console.log('- If profile not created automatically: The trigger is missing')
    console.log('- If login failed: Check password/email')
    
  } catch (error) {
    console.error('❌ Registration test failed:', error.message)
  }
}

testRegistration() 