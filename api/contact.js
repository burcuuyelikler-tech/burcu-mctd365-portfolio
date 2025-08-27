export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const formData = new FormData()
    
    // Add Web3Forms access key from environment variable
    formData.append('access_key', process.env.WEB3FORMS_ACCESS_KEY)
    
    // Add form fields from request body
    const { firstName, lastName, email, company, projectType, category, subcategory, details } = req.body
    
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('company', company || 'Not provided')
    formData.append('projectType', projectType)
    formData.append('category', category || '')
    formData.append('subcategory', subcategory || '')
    formData.append('details', details)
    
    // Submit to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      return res.status(200).json({ message: 'Form submitted successfully!' })
    } else {
      throw new Error('Web3Forms submission failed')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return res.status(500).json({ message: 'Form submission failed' })
  }
}

