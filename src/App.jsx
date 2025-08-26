import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { ChevronDown, ExternalLink, User, BookOpen, Wrench, Mail, Send } from 'lucide-react'
import './App.css'

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
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

  const languages = {
    en: { flag: '🇺🇸', name: 'English' },
    tr: { flag: '🇹🇷', name: 'Türkçe' },
    nl: { flag: '🇳🇱', name: 'Nederlands' },
    de: { flag: '🇩🇪', name: 'Deutsch' }
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Newsletter subscription logic here
    alert('Newsletter subscription submitted!')
    setNewsletterEmail('')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Form submission logic here - send to burcugurel_2@hotmail.com
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
          <div className="w-32 h-32 mx-auto mb-8 bg-white rounded-full flex items-center justify-center text-6xl">
            👩‍💼
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Microsoft Certified Trainer
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-semibold mb-8">
            <span className="text-white">Functional Solution Architect</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              D365 CE & Power Platform Expert
            </span>
          </h2>
          
          <p className="text-lg text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Delivering global CRM transformations and leading cross-functional teams with 9+ years of experience in enterprise D365 CE implementations across 10+ countries.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              onClick={() => setCurrentPage('contact')}
            >
              Let's Connect
            </Button>
            <Button 
              variant="outline" 
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-8 py-3 text-lg"
              onClick={() => setCurrentPage('training')}
            >
              Explore Training
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
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Who I Am</h2>
              <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                <p>
                  With over 9 years in the Microsoft ecosystem, I specialize in architecting large-scale Dynamics 365 CE rollouts for enterprise clients across multiple countries.
                </p>
                <p>
                  As both a Microsoft Certified Trainer and Power Platform Solution Architect Expert, I bring deep technical expertise combined with hands-on leadership experience.
                </p>
                <p>
                  My mission is to build human-centric CRM architectures that drive measurable business outcomes while coaching diverse, cross-functional teams.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Key Expertise</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">9+</div>
                  <div className="text-slate-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-slate-600">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-slate-600">Enterprise Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">6</div>
                  <div className="text-slate-600">Microsoft Certifications</div>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How I Can Help</h2>
            <p className="text-xl text-slate-600">
              Comprehensive solutions combining technical architecture with team leadership
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">D365 CE Implementation</h3>
              <p className="text-slate-600 mb-6">
                End-to-end implementation services including Copilot features, Power Apps customization, and data model governance.
              </p>
              <Button 
                variant="outline" 
                className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => setCurrentPage('implementation')}
              >
                Learn More <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Training Programs</h3>
              <p className="text-slate-600 mb-6">
                MCT-certified training solutions designed to maximize user adoption and team capability development.
              </p>
              <Button 
                variant="outline" 
                className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => setCurrentPage('training')}
              >
                Explore Training <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Insights & Knowledge</h3>
              <p className="text-slate-600 mb-6">
                Industry insights, architectural best practices, and thought leadership in D365 CE ecosystem.
              </p>
              <Button 
                variant="outline" 
                className="text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
                onClick={() => setCurrentPage('blog')}
              >
                Read Articles <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
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
                Tailored workshops focusing on specific D365 CE features and business scenarios
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

      {/* Featured Article */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-4">Featured</span>
              <span className="text-slate-500">December 15, 2025</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              5 Critical Mistakes to Avoid in Your D365 CE Implementation
            </h2>
            <p className="text-slate-600 mb-6">
              Learn from common pitfalls that can derail your D365 CE project and discover proven strategies to ensure success from day one. This comprehensive guide covers technical, organizational, and training-related challenges.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">12 min read • Implementation</span>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button variant="outline" className="border-blue-600 text-blue-600">All Posts</Button>
            <Button variant="outline">Implementation</Button>
            <Button variant="outline">Training</Button>
            <Button variant="outline">Best Practices</Button>
            <Button variant="outline">Career Tips</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm mr-2">Training</span>
                <span className="text-slate-500 text-sm">Dec 10, 2025</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                The Psychology of CRM User Adoption
              </h3>
              <p className="text-slate-600 text-sm">
                Understanding the human factors that drive successful CRM adoption and how to address resistance to change.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm mr-2">Implementation</span>
                <span className="text-slate-500 text-sm">Dec 8, 2025</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                D365 CE Business Process Design
              </h3>
              <p className="text-slate-600 text-sm">
                Best practices for designing efficient business processes that maximize ROI and user satisfaction.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm mr-2">Best Practices</span>
                <span className="text-slate-500 text-sm">Dec 5, 2025</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Power Platform Integration Strategies
              </h3>
              <p className="text-slate-600 text-sm">
                How to leverage Power Platform capabilities to extend D365 CE functionality and create seamless workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input
                      type="text"
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
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
                  <select
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
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                <input
                  type="text"
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
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                readOnly
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Subcategory</label>
              <input
                type="text"
                value={formData.subcategory}
                readOnly
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Details</label>
              <textarea
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
              { name: 'Home', page: 'home' },
              { name: 'Training', page: 'training' },
              { name: 'Implementation', page: 'implementation' },
              { name: 'Blog', page: 'blog' },
              { name: 'Contact', page: 'contact' }
            ].map((item) => (
              <button 
                key={item.name} 
                onClick={() => setCurrentPage(item.page)}
                className="text-white hover:text-blue-300 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="relative">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-800 text-white border border-slate-600 rounded px-3 py-1 appearance-none cursor-pointer"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
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
                Functional Solution Architect and Microsoft Certified Trainer specializing in D365 CE implementations that drive business transformation and user adoption success.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                {['Training', 'Implementation'].map((link) => (
                  <button 
                    key={link} 
                    onClick={() => setCurrentPage(link.toLowerCase())}
                    className="block text-slate-300 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Services</h3>
              <div className="space-y-2">
                {['D365 CE Implementation', 'Corporate Training', 'Certification Prep'].map((service) => (
                  <button 
                    key={service} 
                    onClick={() => setCurrentPage('contact')}
                    className="block text-slate-300 hover:text-white transition-colors"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">© 2025 Burcu Gürel. All rights reserved. Made with Manus</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

