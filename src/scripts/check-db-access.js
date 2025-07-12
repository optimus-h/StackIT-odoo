const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://damjblvjydemncjmwqpy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbWpibHZqeWRlbW5jam13cXB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMxMTkwMCwiZXhwIjoyMDY3ODg3OTAwfQ.8H2Xn91TFXrCnGnzjQuPJkJ8iFTq0AAlSaVJ6izTP-I'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDatabaseAccess() {
  console.log('🔍 Checking database access and permissions...')
  
  try {
    // Test 1: Basic connection
    console.log('\n📋 Test 1: Basic connection...')
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.log(`❌ Connection failed: ${testError.message}`)
      return
    } else {
      console.log('✅ Basic connection successful')
    }

    // Test 2: Check if tables exist
    console.log('\n📋 Test 2: Checking table existence...')
    const tables = ['profiles', 'questions', 'answers', 'tags', 'question_tags', 'votes', 'notifications']
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1)
        
        if (error) {
          console.log(`❌ Table ${table}: ${error.message}`)
        } else {
          console.log(`✅ Table ${table}: Accessible`)
        }
      } catch (err) {
        console.log(`❌ Table ${table}: ${err.message}`)
      }
    }

    // Test 3: Check RLS policies
    console.log('\n📋 Test 3: Checking RLS policies...')
    const { data: rlsPolicies, error: rlsError } = await supabase
      .rpc('get_rls_policies')
    
    if (rlsError) {
      console.log(`❌ RLS check failed: ${rlsError.message}`)
      console.log('This might be normal if the function doesn\'t exist')
    } else {
      console.log(`✅ RLS policies found: ${rlsPolicies?.length || 0}`)
    }

    // Test 4: Check if we can read from profiles
    console.log('\n📋 Test 4: Testing profiles read access...')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5)
    
    if (profilesError) {
      console.log(`❌ Profiles read failed: ${profilesError.message}`)
    } else {
      console.log(`✅ Profiles read successful: ${profiles?.length || 0} profiles found`)
    }

    // Test 5: Check if we can write to profiles (with service role)
    console.log('\n📋 Test 5: Testing profiles write access...')
    const testProfile = {
      id: '00000000-0000-0000-0000-000000000002',
      email: 'test2@example.com',
      full_name: 'Test User 2',
      username: 'testuser2',
      role: 'user'
    }
    
    const { data: insertResult, error: insertError } = await supabase
      .from('profiles')
      .insert(testProfile)
      .select()
      .single()
    
    if (insertError) {
      console.log(`❌ Profiles write failed: ${insertError.message}`)
      if (insertError.message.includes('foreign key')) {
        console.log('💡 This means the user doesn\'t exist in auth.users table')
      }
    } else {
      console.log(`✅ Profiles write successful: ${insertResult.id}`)
      
      // Clean up
      await supabase
        .from('profiles')
        .delete()
        .eq('id', testProfile.id)
      console.log('🧹 Test profile cleaned up')
    }

    // Test 6: Check auth.users access (this should fail with service role)
    console.log('\n📋 Test 6: Testing auth.users access...')
    try {
      const { data: authUsers, error: authError } = await supabase
        .from('auth.users')
        .select('id, email')
        .limit(1)
      
      if (authError) {
        console.log(`❌ Auth.users access failed: ${authError.message}`)
        console.log('💡 This is expected - service role cannot access auth.users directly')
      } else {
        console.log(`✅ Auth.users access successful: ${authUsers?.length || 0} users`)
      }
    } catch (err) {
      console.log(`❌ Auth.users access error: ${err.message}`)
    }

    console.log('\n🎉 Database access check complete!')
    console.log('\n📋 Summary:')
    console.log('- If basic connection failed: Check your Supabase URL and key')
    console.log('- If tables missing: Run the schema SQL in Supabase dashboard')
    console.log('- If RLS blocking: Check Row Level Security policies')
    console.log('- If foreign key errors: Users need to exist in auth.users first')
    
  } catch (error) {
    console.error('❌ Database access check failed:', error.message)
  }
}

checkDatabaseAccess() 