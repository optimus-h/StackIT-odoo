const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://damjblvjydemncjmwqpy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbWpibHZqeWRlbW5jam13cXB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMxMTkwMCwiZXhwIjoyMDY3ODg3OTAwfQ.8H2Xn91TFXrCnGnzjQuPJkJ8iFTq0AAlSaVJ6izTP-I'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDatabase() {
  console.log('🔍 Checking database setup...')
  
  try {
    // Check if tables exist
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
          console.log(`✅ Table ${table}: OK`)
        }
      } catch (err) {
        console.log(`❌ Table ${table}: ${err.message}`)
      }
    }
    
    // Check if tags exist
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('*')
    
    if (tagsError) {
      console.log(`❌ Tags query failed: ${tagsError.message}`)
    } else {
      console.log(`✅ Found ${tags.length} tags`)
      if (tags.length > 0) {
        console.log('Sample tags:', tags.slice(0, 3).map(t => t.name))
      }
    }
    
    // Check if any users exist
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5)
    
    if (profilesError) {
      console.log(`❌ Profiles query failed: ${profilesError.message}`)
    } else {
      console.log(`✅ Found ${profiles.length} user profiles`)
    }
    
    console.log('\n🎉 Database check complete!')
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message)
  }
}

checkDatabase() 