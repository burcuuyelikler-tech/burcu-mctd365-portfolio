import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { ChevronDown, ExternalLink, User, BookOpen, Wrench, Mail, Send } from 'lucide-react'
import { translations } from './translations.js'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectType: '',
    category: '',
    subcategory: '',
    details: ''
  })

  // Dynamic logo loading using Vite's import.meta.glob
  const [logoFiles, setLogoFiles] = useState([])
  
  useEffect(() => {
    const loadLogos = async () => {
      try {
        // Use Vite's import.meta.glob to get all logo files
        const logoModules = import.meta.glob('/public/logos/*.{png,jpg,jpeg,svg}', { 
          as: 'url',
          eager: false 
        })
        
        const logoPromises = Object.entries(logoModules).map(async ([path, importFn]) => {
          const url = await importFn()
          const fileName = path.split('/').pop().split('.')[0]
          const cleanName = fileName
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          
          return {
            src: `/logos/${path.split('/').pop()}`,
            alt: `${cleanName} Partner`,
            name: cleanName
          }
        })
        
        const logos = await Promise.all(logoPromises)
        
        // If no logos found via glob, try direct file checking
        if (logos.length === 0) {
          const knownLogos = [
            'ahe', 'cocacola', 'danone', 'delonghi', 'demirorenmedya', 
            'eczacibasi', 'fakir', 'ford', 'honda', 'hsa', 'koczer', 
            'lindstrom', 'loreal', 'madamecoco', 'toyota', 'vavacars'
          ]
          
          const fallbackLogos = knownLogos.map(name => ({
            src: `/logos/${name}.png`,
            alt: `${name.charAt(0).toUpperCase() + name.slice(1)} Partner`,
            name: name.charAt(0).toUpperCase() + name.slice(1)
          }))
          
          setLogoFiles(fallbackLogos)
        } else {
          setLogoFiles(logos)
        }
      } catch (error) {
        console.error('Error loading logos:', error)
        // Fallback to known logos
        const fallbackLogos = [
          { src: '/logos/ahe.png', alt: 'AHE Partner', name: 'AHE' },
          { src: '/logos/cocacola.png', alt: 'Coca Cola Partner', name: 'Coca Cola' },
          { src: '/logos/danone.png', alt: 'Danone Partner', name: 'Danone' },
          { src: '/logos/delonghi.png', alt: 'DeLonghi Partner', name: 'DeLonghi' },
          { src: '/logos/demirorenmedya.png', alt: 'Demirören Medya Partner', name: 'Demirören Medya' },
          { src: '/logos/eczacibasi.png', alt: 'Eczacıbaşı Partner', name: 'Eczacıbaşı' },
          { src: '/logos/fakir.png', alt: 'Fakir Partner', name: 'Fakir' },
          { src: '/logos/ford.jpg', alt: 'Ford Partner', name: 'Ford' },
          { src: '/logos/honda.png', alt: 'Honda Partner', name: 'Honda' },
          { src: '/logos/hsa.png', alt: 'HSA Partner', name: 'HSA' },
          { src: '/logos/koczer.png', alt: 'Koczer Partner', name: 'Koczer' },
          { src: '/logos/lindstrom.png', alt: 'Lindström Partner', name: 'Lindström' },
          { src: '/logos/loreal.png', alt: 'L\'Oréal Partner', name: 'L\'Oréal' },
          { src: '/logos/madamecoco.png', alt: 'Madame Coco Partner', name: 'Madame Coco' },
          { src: '/logos/toyota.png', alt: 'Toyota Partner', name: 'Toyota' },
          { src: '/logos/vavacars.png', alt: 'Vavacars Partner', name: 'Vavacars' }
        ]
        setLogoFiles(fallbackLogos)
      }
    }
    
    loadLogos()
  }, [])
  
  // Blog states
  const [blogPosts, setBlogPosts] = useState([])
  const [blogCategories, setBlogCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [blogLoading, setBlogLoading] = useState(false)
  
  // Medium RSS URL
  const MEDIUM_RSS_URL = 'https://medium.com/feed/@burcugurel'

  // Function to get the current language from the DOM (if set by a previous script)
  const getInitialLanguage = () => {
    const htmlLang = document.documentElement.lang
    if (htmlLang) return htmlLang
    const storedLang = localStorage.getItem('selectedLanguage')
    return storedLang || 'en'
  }

  const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    // Update the HTML lang attribute
    document.documentElement.lang = selectedLanguage
    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', selectedLanguage)
  }, [selectedLanguage])

  // Translation function
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[selectedLanguage]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        // Fallback to English if translation not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey]
          } else {
            return key // Return key if no translation found
          }
        }
        break
      }
    }
    
    return value || key
  }

  // Blog fetch functions - Medium RSS
  const fetchMediumPosts = async () => {
    try {
      setBlogLoading(true)
      // Use RSS2JSON service to convert RSS to JSON
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`)
      const data = await response.json()
      
      if (data.status === 'ok') {
        // Process Medium posts with language detection
        const posts = data.items.map((item, index) => {
          // Simple language detection based on title/content
          let detectedLanguage = 'en' // default
          const text = (item.title + ' ' + item.description).toLowerCase()
          
          // Turkish detection
          if (text.includes('türkiye') || text.includes('türk') || text.includes('ile') || 
              text.includes('için') || text.includes('olan') || text.includes('bir') ||
              text.includes('bu') || text.includes('ve') || text.includes('da') ||
              text.includes('de') || text.includes('ı') || text.includes('ğ') ||
              text.includes('ş') || text.includes('ç') || text.includes('ö') || text.includes('ü')) {
            detectedLanguage = 'tr'
          }
          // Dutch detection
          else if (text.includes('het') || text.includes('een') || text.includes('van') ||
                   text.includes('voor') || text.includes('met') || text.includes('zijn') ||
                   text.includes('hebben') || text.includes('worden') || text.includes('kunnen')) {
            detectedLanguage = 'nl'
          }
          // German detection
          else if (text.includes('der') || text.includes('die') || text.includes('das') ||
                   text.includes('und') || text.includes('ist') || text.includes('mit') ||
                   text.includes('für') || text.includes('von') || text.includes('zu') ||
                   text.includes('ß') || text.includes('ä') || text.includes('ö') || text.includes('ü')) {
            detectedLanguage = 'de'
          }
          
          return {
            id: index,
            title: item.title,
            excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            content: item.content,
            link: item.link,
            publishedAt: item.pubDate,
            categories: [], // Empty categories for manual assignment
            thumbnail: item.thumbnail || null,
            language: detectedLanguage
          }
        })
        setBlogPosts(posts)
        
        // Predefined categories for manual selection
        const predefinedCategories = [
          { id: 1, name: 'D365 CE', slug: 'd365-ce' },
          { id: 2, name: 'Power Platform', slug: 'power-platform' },
          { id: 3, name: 'Training', slug: 'training' },
          { id: 4, name: 'Implementation', slug: 'implementation' },
          { id: 5, name: 'Best Practices', slug: 'best-practices' },
          { id: 6, name: 'Architecture', slug: 'architecture' }
        ]
        setBlogCategories(predefinedCategories)
      }
    } catch (error) {
      console.error('Error fetching Medium posts:', error)
      setBlogPosts([])
      setBlogCategories([])
    } finally {
      setBlogLoading(false)
    }
  }

  // Load blog data when blog page is accessed
  useEffect(() => {
    if (currentPage === 'blog') {
      fetchMediumPosts()
    }
  }, [currentPage])

  const languages = {
    en: { 
      flag: (
        <svg className="w-4 h-3 inline-block mr-1" viewBox="0 0 640 480">
          <path fill="#012169" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
          <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l246-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
          <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
          <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
        </svg>
      ), 
      name: 'English' 
    },
    tr: { 
      flag: (
        <svg className="w-4 h-3 inline-block mr-1" viewBox="0 0 640 480">
          <path fill="#e30a17" d="M0 0h640v480H0z"/>
          <circle cx="200" cy="240" r="76.8" fill="#fff"/>
          <circle cx="208" cy="240" r="61.44" fill="#e30a17"/>
          <path fill="#fff" d="m283.7 221.3 4.4 13.5h14.2l-11.5 8.4 4.4 13.5-11.5-8.4-11.5 8.4 4.4-13.5-11.5-8.4h14.2z"/>
        </svg>
      ), 
      name: 'Türkçe' 
    },
    nl: { 
      flag: (
        <svg className="w-4 h-3 inline-block mr-1" viewBox="0 0 640 480">
          <path fill="#21468B" d="M0 320h640v160H0z"/>
          <path fill="#FFF" d="M0 160h640v160H0z"/>
          <path fill="#AE1C28" d="M0 0h640v160H0z"/>
        </svg>
      ), 
      name: 'Nederlands' 
    },
    de: { 
      flag: (
        <svg className="w-4 h-3 inline-block mr-1" viewBox="0 0 640 480">
          <path fill="#ffce00" d="M0 320h640v160H0z"/>
          <path fill="#dd0000" d="M0 160h640v160H0z"/>
          <path fill="#000" d="M0 0h640v160H0z"/>
        </svg>
      ), 
      name: 'Deutsch' 
    }
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      alert('Please enter a valid email address.')
      return
    }
    
    // Substack newsletter subscription - redirect to Substack with email
    window.open(`https://burcugurel.substack.com/subscribe?email=${encodeURIComponent(newsletterEmail)}`, '_blank')
    setNewsletterEmail('')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    // Form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    // Validate required fields
    if (!formData.firstName || formData.firstName.length < 3) {
      alert('First name must be at least 3 characters long.')
      return
    }
    
    if (!formData.lastName || formData.lastName.length < 3) {
      alert('Last name must be at least 3 characters long.')
      return
    }
    
    if (!formData.email || !emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.')
      return
    }
    
    if (!formData.details || formData.details.length < 10) {
      alert('Please provide more details (at least 10 characters).')
      return
    }
    
    try {
      const formDataToSubmit = new FormData()
      
      // Add Web3Forms access key (you need to add this)
      formDataToSubmit.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY')
      
      // Add form fields
      formDataToSubmit.append('firstName', formData.firstName)
      formDataToSubmit.append('lastName', formData.lastName)
      formDataToSubmit.append('email', formData.email)
      formDataToSubmit.append('company', formData.company)
      formDataToSubmit.append('projectType', formData.projectType)
      formDataToSubmit.append('category', formData.category)
      formDataToSubmit.append('subcategory', formData.subcategory)
      formDataToSubmit.append('details', formData.details)
      
      // Web3Forms submission
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSubmit
      })
      
      if (response.ok) {
        alert('Form submitted successfully!')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          projectType: '',
          category: '',
          subcategory: '',
          details: ''
        })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      alert('There was an error submitting the form. Please try again.')
      console.error('Form submission error:', error)
    }
  }

  const handleTrainingRequest = (category, subcategory) => {
    setFormData({
      ...formData,
      category: category,
      subcategory: subcategory
    })
    setCurrentPage('request-training')
  }

  const renderHomePage = () => (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src="/avatar.png" 
              alt="Burcu Gürel - Microsoft Certified Trainer" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t('hero.title')}
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-semibold mb-8">
            <span className="text-white">{t('hero.subtitle')}</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t('hero.description')}
            </span>
          </h2>
          
          <p className="text-lg text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            {t('hero.intro')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              onClick={() => setCurrentPage('contact')}
            >
              {t('hero.connectBtn')}
            </Button>
            <Button 
              variant="outline" 
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-8 py-3 text-lg"
              onClick={() => setCurrentPage('training')}
            >
              {t('hero.trainingBtn')}
            </Button>
          </div>
          
          <div className="mt-16">
            <ChevronDown className="w-8 h-8 text-white mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Who I Am Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('whoIAm.title')}</h2>
              <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                <p>
                  {t('whoIAm.paragraph1')}
                </p>
                <p>
                  {t('whoIAm.paragraph2')}
                </p>
                <p>
                  {t('whoIAm.paragraph3')}
                </p>
              </div>
            </div>
            
            <div className="bg-slate-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('whoIAm.keyExpertise')}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">9+</div>
                  <div className="text-slate-600">{t('whoIAm.yearsExp')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-slate-600">{t('whoIAm.countries')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-slate-600">{t('whoIAm.clients')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">6</div>
                  <div className="text-slate-600">{t('whoIAm.certifications')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How I Can Help Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('help.title')}</h2>
            <p className="text-xl text-slate-600">
              {t('help.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('help.implementation.title')}</h3>
              <p className="text-slate-600 mb-6">
                {t('help.implementation.description')}
              </p>
              <Button 
                variant="outline" 
                className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => setCurrentPage('implementation')}
              >
                {t('help.implementation.button')} <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('help.training.title')}</h3>
              <p className="text-slate-600 mb-6">
                {t('help.training.description')}
              </p>
              <Button 
                variant="outline" 
                className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => setCurrentPage('training')}
              >
                {t('help.training.button')} <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('help.insights.title')}</h3>
              <p className="text-slate-600 mb-6">
                {t('help.insights.description')}
              </p>
              <Button 
                variant="outline" 
                className="text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
                onClick={() => setCurrentPage('blog')}
              >
                {t('help.insights.button')} <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('references.title')}</h2>
            <p className="text-lg text-slate-600">
              {t('references.subtitle')}
            </p>
          </div>
          
          {/* Logo Slider */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8 items-center">
              {/* Logo items - duplicated for seamless loop */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex space-x-8 items-center">
                  {/* Dynamic logo rendering */}
                  {logoFiles.map((logo, index) => (
                    <div key={`${setIndex}-${index}`} className="bg-slate-50 rounded-lg p-4 flex items-center justify-center h-20 hover:shadow-lg transition-all duration-300">
                      <img 
                        src={logo.src}
                        alt={logo.alt}
                        className="max-h-16 max-w-[160px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div className="text-slate-400 font-semibold text-sm hidden">{logo.name}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-slate-600 mb-8">
            Get the latest insights and updates on D365 CE and Power Platform
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              <Mail className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* Ready to Get Started Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how I can help transform your D365 CE experience
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            onClick={() => setCurrentPage('contact')}
          >
            Schedule Free Consultation
          </Button>
        </div>
      </section>
    </>
  )

  const renderTrainingPage = () => (
    <div className="pt-24">
      {/* Training Hero */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Training Excellence</h1>
          <p className="text-xl text-green-100 max-w-4xl mx-auto">
            Transforming teams through comprehensive D365 CE and Power Platform training programs designed to maximize user adoption and unlock human potential.
          </p>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">My Training Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Hands-On Learning</h3>
              <p className="text-slate-600">
                Interactive sessions with real-world scenarios that mirror your actual business processes
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                👥
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Role-Based Training</h3>
              <p className="text-slate-600">
                Customized content tailored to specific job roles and individual learning styles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Training Programs</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  🏢
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Corporate Training Programs</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Comprehensive training solutions for organizations implementing or optimizing D365 CE and Power Platform
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  End-User Training (Sales, Service, Marketing)
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Administrator Training
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Power User Training
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Customization Configuration Training
                </li>
              </ul>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                onClick={() => handleTrainingRequest('Corporate Training', 'Corporate Training Programs')}
              >
                Request Corporate Training
              </Button>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  🎓
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Certification Preparation</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Structured preparation courses for Microsoft D365 CE and Power Platform certifications
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  PL-600 Solution Architect Expert
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  MB-220 Marketing Functional Consultant
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  MB-210 Sales Functional Consultant
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Copilot D365 CE ve Power Platform sınavlarına resmi Microsoft teknik eğitmen (MCT) materyalleri ile Microsoft onaylı müfredatlarla eğitim
                </li>
              </ul>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white w-full"
                onClick={() => handleTrainingRequest('Certification Preparation', 'Certification Preparation')}
              >
                Start Certification Prep
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  🔧
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Custom Workshops</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Tailored solutions for unique business requirements
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Advanced Configuration Workshops
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Power Platform Integration
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Business Process Optimization
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Copilot & AI Builder Training
                </li>
              </ul>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                onClick={() => handleTrainingRequest('Custom Workshops', 'Custom Workshops')}
              >
                Design Custom Workshop
              </Button>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  👨‍💼
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Executive Coaching</h3>
              </div>
              <p className="text-slate-600 mb-6">
                One-on-one coaching for executives and key stakeholders
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Strategic D365 CE Utilization
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  ROI Optimization Strategies
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Change Leadership Coaching
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Performance Dashboard Training
                </li>
              </ul>
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white w-full"
                onClick={() => handleTrainingRequest('Executive Coaching', 'Executive Coaching')}
              >
                Schedule Coaching
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderImplementationPage = () => (
    <div className="pt-24">
      {/* Implementation Hero */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">D365 CE Implementation</h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Expert implementation services that transform your business processes and drive measurable results through strategic D365 CE deployment.
          </p>
        </div>
      </section>

      {/* Implementation Approach */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Implementation Approach</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Discovery</h3>
              <p className="text-slate-600">Business requirements analysis and process mapping</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                🎨
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Design</h3>
              <p className="text-slate-600">Solution architecture and configuration planning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                🔧
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Build</h3>
              <p className="text-slate-600">System configuration and custom development</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                🚀
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Deploy</h3>
              <p className="text-slate-600">Go-live support and user training</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Implementation Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">System Configuration</h3>
              <p className="text-slate-600 mb-4">
                Complete D365 CE setup tailored to your business processes
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Entity customization
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Workflow automation
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Security role configuration
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Copilot integration
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Data Migration</h3>
              <p className="text-slate-600 mb-4">
                Seamless migration of your existing data to D365 CE
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Data mapping and cleansing
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Migration strategy
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Testing and validation
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Go-live support
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Custom Development</h3>
              <p className="text-slate-600 mb-4">
                Tailored solutions for unique business requirements
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Custom plugins
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Web resources
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Power Platform integration
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Third-party connectors
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Business Process Optimization</h3>
              <p className="text-slate-600 mb-4">
                Streamline workflows for maximum efficiency
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Process analysis
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Automation opportunities
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Performance optimization
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Best practice implementation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Get a personalized quote for your D365 CE implementation project
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            onClick={() => setCurrentPage('contact')}
          >
            Request Quote
          </Button>
        </div>
      </section>
    </div>
  )

  const renderBlogPage = () => (
    <div className="pt-24">
      {/* Blog Hero */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Insights & Knowledge</h1>
          <p className="text-xl text-purple-100 max-w-4xl mx-auto">
            Industry insights, best practices, and thought leadership to help you stay ahead in the D365 CE ecosystem.
          </p>
        </div>
      </section>

      {blogLoading ? (
        <section className="py-16 bg-slate-100">
          <div className="container mx-auto px-4 text-center">
            <div className="text-xl text-slate-600">Loading blog posts...</div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Article */}
          {blogPosts.filter(post => post.language === selectedLanguage).length > 0 && (
            <section className="py-16 bg-slate-100">
              <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="mr-3">
                      {languages[blogPosts.filter(post => post.language === selectedLanguage)[0]?.language]?.flag}
                    </div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-4">Featured</span>
                    <span className="text-slate-500">
                      {new Date(blogPosts.filter(post => post.language === selectedLanguage)[0]?.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    {blogPosts.filter(post => post.language === selectedLanguage)[0]?.title}
                  </h2>
                  <p className="text-slate-600 mb-6">
                    {blogPosts.filter(post => post.language === selectedLanguage)[0]?.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      {blogPosts.filter(post => post.language === selectedLanguage)[0]?.categories.length > 0 ? 
                       blogPosts.filter(post => post.language === selectedLanguage)[0]?.categories[0] : 'Article'}
                    </span>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open(blogPosts.filter(post => post.language === selectedLanguage)[0]?.link, '_blank')}
                    >
                      Read on Medium
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Blog Categories */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-4 justify-center mb-12">
                <Button 
                  variant="outline" 
                  className={selectedCategory === 'all' ? "border-blue-600 text-blue-600" : ""}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Posts
                </Button>
                {blogCategories.map(category => (
                  <Button 
                    key={category.id}
                    variant="outline"
                    className={selectedCategory === category.slug ? "border-blue-600 text-blue-600" : ""}
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Blog Posts Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {blogPosts
                  .filter(post => {
                    // Filter by selected language
                    const languageMatch = post.language === selectedLanguage
                    // Filter by category
                    const categoryMatch = selectedCategory === 'all' || post.categories.some(cat => cat.toLowerCase().replace(/\s+/g, '-') === selectedCategory)
                    return languageMatch && categoryMatch
                  })
                  .slice(1) // Skip first post (featured)
                  .map(post => (
                    <div key={post.id} className="bg-slate-50 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
                         onClick={() => window.open(post.link, '_blank')}>
                      {post.thumbnail && (
                        <img 
                          src={post.thumbnail} 
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="flex items-center mb-4">
                        <div className="mr-2">
                          {languages[post.language]?.flag}
                        </div>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm mr-2">
                          {post.categories.length > 0 ? post.categories[0] : 'Article'}
                        </span>
                        <span className="text-slate-500 text-sm">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {post.excerpt}
                      </p>
                      <div className="text-blue-600 text-sm font-medium">
                        Read on Medium →
                      </div>
                    </div>
                  ))}
              </div>

              {/* No posts message */}
              {blogPosts.length === 0 && !blogLoading && (
                <div className="text-center py-12">
                  <p className="text-slate-600 text-lg">No blog posts available yet. Check back soon!</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )

  const renderContactPage = () => (
    <div className="pt-24">
      {/* Contact Hero */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's Connect</h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Ready to transform your D365 CE experience? Let's discuss how my expertise can help your organization achieve its goals.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Schedule Your Free Consultation</h2>
              <p className="text-slate-600 mb-8">
                Get personalized insights and recommendations for your D365 CE project
              </p>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Web3Forms hidden fields */}
                <input type="hidden" name="access_key" value="6732f0dd-ba46-4e7c-97d5-1dfd1adeebd3" />
                <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio" />
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company (optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
                  <select
                    name="project_type"
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="D365 CE Implementation">D365 CE Implementation</option>
                    <option value="Training Program">Training Program</option>
                    <option value="Implementation + Training">Implementation + Training</option>
                    <option value="Consultation Only">Consultation Only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Details</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide additional details about your project requirements..."
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full py-3">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white">💼</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">LinkedIn</h4>
                    <p className="text-slate-600">linkedin.com/in/gurelburcu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderRequestTrainingPage = () => (
    <div className="pt-24">
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Request Training</h1>
          
          <form onSubmit={handleFormSubmit} className="bg-white rounded-lg p-8 shadow-lg space-y-6">
            {/* Web3Forms hidden fields */}
            <input type="hidden" name="access_key" value="6732f0dd-ba46-4e7c-97d5-1dfd1adeebd3" />
            <input type="hidden" name="subject" value="New Training Request from Portfolio" />
            <input type="hidden" name="from_name" value="Portfolio Training Request Form" />
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company (optional)</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                readOnly
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Subcategory</label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                readOnly
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide additional details about your training requirements..."
              />
            </div>
            
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full py-3">
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </form>
        </div>
      </section>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="text-xl font-bold text-white bg-green-600 px-3 py-1 rounded cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            Burcu Gürel
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {[
              { name: t('nav.home'), page: 'home' },
              { name: t('nav.training'), page: 'training' },
              { name: t('nav.implementation'), page: 'implementation' },
              { name: t('nav.blog'), page: 'blog' },
              { name: t('nav.contact'), page: 'contact' }
            ].map((item) => (
              <button 
                key={item.page} 
                onClick={() => setCurrentPage(item.page)}
                className="text-white hover:text-blue-300 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="relative flex items-center">
            <div className="mr-2">
              {languages[selectedLanguage]?.flag}
            </div>
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-800 text-white border border-slate-600 rounded px-3 py-1 appearance-none cursor-pointer"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Page Content */}
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'training' && renderTrainingPage()}
      {currentPage === 'implementation' && renderImplementationPage()}
      {currentPage === 'blog' && renderBlogPage()}
      {currentPage === 'contact' && renderContactPage()}
      {currentPage === 'request-training' && renderRequestTrainingPage()}

      {/* Footer */}
      <footer className="bg-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Burcu Gürel</h3>
              <p className="text-slate-300">
                {t('footer.description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{t('footer.quickLinks')}</h3>
              <div className="space-y-2">
                {[
                  { name: t('nav.training'), page: 'training' },
                  { name: t('nav.implementation'), page: 'implementation' }
                ].map((link) => (
                  <button 
                    key={link.page} 
                    onClick={() => setCurrentPage(link.page)}
                    className="block text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{t('footer.services')}</h3>
              <div className="space-y-2">
                {[
                  { name: t('footer.servicesList.implementation'), page: 'contact' },
                  { name: t('footer.servicesList.training'), page: 'contact' },
                  { name: t('footer.servicesList.certification'), page: 'contact' }
                ].map((service) => (
                  <button 
                    key={service.name} 
                    onClick={() => setCurrentPage(service.page)}
                    className="block text-slate-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

