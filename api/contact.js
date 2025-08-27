export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Parse JSON body manually (Vercel serverless for non-Next apps won't auto-parse)
  let body = {};
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    body = raw ? JSON.parse(raw) : {};
  } catch (e) {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }

  const { firstName, lastName, email, company, projectType, category, subcategory, details } = body;

  if (!process.env.WEB3FORMS_ACCESS_KEY) {
    return res.status(500).json({ message: 'Missing WEB3FORMS_ACCESS_KEY on the server' });
  }

  try {
    const formData = new FormData();
    formData.append('access_key', process.env.WEB3FORMS_ACCESS_KEY);

    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
    formData.append('name', fullName || 'Website Visitor');
    formData.append('email', email || '');
    formData.append('subject', 'New contact from burcu-portfolio');
    formData.append('message', details || '');

    if (company) formData.append('company', company);
    if (projectType) formData.append('projectType', projectType);
    if (category) formData.append('category', category);
    if (subcategory) formData.append('subcategory', subcategory);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data?.success) {
      return res.status(200).json({ message: 'Form submitted successfully!' });
    } else {
      return res.status(502).json({ message: data?.message || 'Web3Forms submission failed' });
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ message: 'Form submission failed' });
  }
}
