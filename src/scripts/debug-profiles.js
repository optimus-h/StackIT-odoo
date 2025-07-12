const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://damjblvjydemncjmwqpy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbWpibHZqeWRlbW5jam13cXB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMxMTkwMCwiZXhwIjoyMDY3ODg3OTAwfQ.8H2Xn91TFXrCnGnzjQuPJkJ8iFTq0AAlSaVJ6izTP-I'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugProfiles() {
  console.log('🔍 Debugging user profiles...')
  
  try {
    // Check auth.users table
    console.log('\n📋 Checking auth.users...')
    const { data: authUsers, error: authError } = await supabase
      .from('auth.users')
      .select('id, email, created_at')
      .limit(5)
    
    if (authError) {
      console.log(`❌ Error accessing auth.users: ${authError.message}`)
      console.log('Note: This might be a permissions issue. Check manually in Supabase dashboard.')
    } else {
      console.log(`✅ Found ${authUsers?.length || 0} users in auth.users`)
      if (authUsers && authUsers.length > 0) {
        console.log('Sample users:', authUsers.map(u => ({ id: u.id, email: u.email })))
      }
    }

    // Check profiles table
    console.log('\n📋 Checking profiles table...')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5)
    
    if (profilesError) {
      console.log(`❌ Error accessing profiles: ${profilesError.message}`)
    } else {
      console.log(`✅ Found ${profiles?.length || 0} profiles`)
      if (profiles && profiles.length > 0) {
        console.log('Sample profiles:', profiles.map(p => ({ id: p.id, email: p.email, full_name: p.full_name })))
      }
    }

    // Check if trigger exists
    console.log('\n📋 Checking for trigger...')
    const { data: triggers, error: triggerError } = await supabase
      .rpc('check_trigger_exists', { trigger_name: 'on_auth_user_created' })
    
    if (triggerError) {
      console.log(`❌ Error checking trigger: ${triggerError.message}`)
      console.log('You need to run the trigger creation SQL manually.')
    } else {
      console.log(`✅ Trigger check result: ${triggers}`)
    }

    // Try to create a test profile manually
    console.log('\n📋 Testing profile creation...')
    const testUserId = '00000000-0000-0000-0000-000000000001'
    const { data: testProfile, error: testError } = await supabase
      .from('profiles')
      .insert({
        id: testUserId,
        email: 'test@example.com',
        full_name: 'Test User',
        username: 'testuser',
        role: 'user'
      })
      .select()
      .single()
    
    if (testError) {
      console.log(`❌ Error creating test profile: ${testError.message}`)
    } else {
      console.log(`✅ Test profile created successfully: ${testProfile.id}`)
      
      // Clean up test profile
      await supabase
        .from('profiles')
        .delete()
        .eq('id', testUserId)
      console.log('🧹 Test profile cleaned up')
    }

    console.log('\n🎉 Debug complete!')
    console.log('\n📋 Next steps:')
    console.log('1. If no users found: Register a new user in your app')
    console.log('2. If no profiles found: Run the trigger SQL in Supabase dashboard')
    console.log('3. If trigger error: Copy the trigger SQL from supabase-schema.sql')
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message)
  }
}

debugProfiles() 