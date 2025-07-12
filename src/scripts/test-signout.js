const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = 'https://damjblvjydemncjmwqpy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbWpibHZqeWRlbW5jam13cXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTE5MDAsImV4cCI6MjA2Nzg4NzkwMH0.Oj7oZtCTRi1uWaLlMR1H3-6_FmlbCTbUo4vmx-T99xI'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSignOut() {
  console.log('Testing sign out functionality...')
  
  try {
    // First, let's check if there's a current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('Error getting session:', sessionError)
      return
    }
    
    if (session) {
      console.log('Current session found for user:', session.user.email)
      
      // Test sign out
      console.log('Attempting to sign out...')
      const { error: signOutError } = await supabase.auth.signOut()
      
      if (signOutError) {
        console.error('Sign out error:', signOutError)
        return
      }
      
      console.log('Sign out successful!')
      
      // Verify session is cleared
      const { data: { session: newSession }, error: newSessionError } = await supabase.auth.getSession()
      
      if (newSessionError) {
        console.error('Error getting new session:', newSessionError)
        return
      }
      
      if (!newSession) {
        console.log('✅ Session successfully cleared - sign out working correctly')
      } else {
        console.log('❌ Session still exists after sign out - this indicates a problem')
      }
      
    } else {
      console.log('No current session found - user is already signed out')
    }
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

// Run the test
testSignOut() 