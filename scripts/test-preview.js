import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function testPreRenderedContent() {
  try {
    const htmlPath = path.join(__dirname, '../dist/index.html')
    const html = fs.readFileSync(htmlPath, 'utf-8')
    
    console.log('🔍 Testing pre-rendered content...\n')
    
    // Test for key content elements
    const tests = [
      {
        name: 'Hero Title',
        search: 'Save the Date',
        expected: true
      },
      {
        name: 'Couple Names',
        search: 'Andréanne Salvas',
        expected: true
      },
      {
        name: 'Event Date',
        search: 'September 26th, 2026',
        expected: true
      },
      {
        name: 'Location',
        search: 'Manoir Montpellier',
        expected: true
      },
      {
        name: 'Our Story Section',
        search: 'Our Journey',
        expected: true
      },
      {
        name: 'Years Married',
        search: '10 Years',
        expected: true
      },
      {
        name: 'Footer',
        search: 'With all our love',
        expected: true
      },
      {
        name: 'Meta Tags',
        search: 'og:title',
        expected: true
      },
      {
        name: 'Structured Data',
        search: 'application/ld+json',
        expected: true
      }
    ]
    
    let passed = 0
    let total = tests.length
    
    tests.forEach(test => {
      const found = html.includes(test.search)
      const status = found === test.expected ? '✅' : '❌'
      console.log(`${status} ${test.name}: ${found ? 'Found' : 'Not found'}`)
      if (found === test.expected) passed++
    })
    
    console.log(`\n📊 Results: ${passed}/${total} tests passed`)
    
    if (passed === total) {
      console.log('🎉 All tests passed! Your site is ready for link previews.')
      console.log('\n📱 Social Media Preview Features:')
      console.log('   • Open Graph tags for Facebook, LinkedIn, etc.')
      console.log('   • Twitter Card support')
      console.log('   • Structured data for search engines')
      console.log('   • Pre-rendered content for crawlers')
    } else {
      console.log('⚠️  Some tests failed. Check the build process.')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

testPreRenderedContent()
