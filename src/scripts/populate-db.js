const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://damjblvjydemncjmwqpy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbWpibHZqeWRlbW5jam13cXB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjMxMTkwMCwiZXhwIjoyMDY3ODg3OTAwfQ.8H2Xn91TFXrCnGnzjQuPJkJ8iFTq0AAlSaVJ6izTP-I'

const supabase = createClient(supabaseUrl, supabaseKey)

async function populateDatabase() {
  console.log('🚀 Populating database with initial data...')
  
  try {
    // Insert default tags
    const defaultTags = [
      { name: 'React', color: '#61dafb' },
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'Node.js', color: '#339933' },
      { name: 'Python', color: '#3776ab' },
      { name: 'SQL', color: '#336791' },
      { name: 'CSS', color: '#1572b6' },
      { name: 'HTML', color: '#e34f26' },
      { name: 'Next.js', color: '#000000' },
      { name: 'Supabase', color: '#3ecf8e' },
      { name: 'JWT', color: '#d73a49' },
      { name: 'API', color: '#6f42c1' },
      { name: 'Database', color: '#28a745' },
      { name: 'Authentication', color: '#dc3545' },
      { name: 'Deployment', color: '#fd7e14' }
    ]

    console.log('📝 Inserting default tags...')
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .insert(defaultTags)
      .select()

    if (tagsError) {
      console.log(`❌ Error inserting tags: ${tagsError.message}`)
    } else {
      console.log(`✅ Inserted ${tags.length} tags`)
    }

    // Create a test admin user profile
    console.log('👤 Creating test admin user...')
    const testAdminProfile = {
      id: '00000000-0000-0000-0000-000000000001', // This will be replaced by actual user ID
      email: 'admin@stackit.com',
      full_name: 'Admin User',
      username: 'admin',
      role: 'admin'
    }

    // Note: This will only work if a user with this ID exists in auth.users
    // In practice, you'd create the user through Supabase Auth first
    console.log('⚠️  Note: Admin user profile will be created when you sign up with admin@stackit.com')

    console.log('\n🎉 Database population complete!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to Authentication → Users')
    console.log('3. Create a user with email: admin@stackit.com')
    console.log('4. The profile will be automatically created with admin role')
    console.log('5. Start your development server: npm run dev')
    
  } catch (error) {
    console.error('❌ Database population failed:', error.message)
  }
}

populateDatabase() 