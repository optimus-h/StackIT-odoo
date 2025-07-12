const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.log('Please create a .env.local file with:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key')
  process.exit(1)
}

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