import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, BookOpen, HelpCircle, FileText, Menu, X, AtSign, Cog, Clipboard, Mail, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // A nice dark theme

// CodeBlock Component with Syntax Highlighting and Copy Functionality
function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative mb-4">
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 bg-gray-800 text-gray-300 hover:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
        aria-label="Copy code to clipboard"
      >
        {copied ? 'Copied!' : <Clipboard className="h-4 w-4" />}
      </button>
      <div className="rounded-md overflow-auto text-sm">
        <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers>
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// FAQItem Component for Individual FAQ with Dropdown Functionality
function FAQItem({ question, answer, searchTerm }) {
  const [isOpen, setIsOpen] = useState(false);

  // Highlight function specific to FAQItem
  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, `<mark class="bg-yellow-200">$1</mark>`);
  };

  const highlightedQuestion = highlightText(question, searchTerm);
  const highlightedAnswer = highlightText(answer, searchTerm);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: highlightedQuestion }}></span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-blue-500" /> : <ChevronDown className="h-5 w-5 text-blue-500" />}
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-700 leading-7" dangerouslySetInnerHTML={{ __html: highlightedAnswer }}></p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { id: 'general', icon: BookOpen, label: "General" },
    { id: 'registration', icon: AtSign, label: "Registration" },
    { id: 'faq', icon: HelpCircle, label: "FAQ" },
    { id: 'guides', icon: FileText, label: "Guides" },
    { id: 'api', icon: Cog, label: "API Reference" },
  ];

  // Content strings for each section
  const generalText = `Welcome to the support documentation. Here you’ll find everything you need to get started quickly.`;

  // FAQ Array
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: `
        Currently, the 'Forgot Password' feature on accounts.dovuchcha.uz is not available. 
        We are actively working on enabling this feature in the near future. 

        In the meantime, if you've forgotten your password, please contact our support team at 
        dovuchcha@dovuchcha.uz or via Telegram at Support Admin. 
        Our team will assist you with resetting your password.
      `
    },
    {
      question: "Where can I find billing information?",
      answer: "Billing information can be found in your account settings under the 'Billing' section. Here you can view invoices, update payment methods, and manage subscriptions."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team via email at dovuchcha@dovuchcha.uz or through our Telegram channel at Support Admin."
    },
    {
      question: "Can I integrate the API with my existing systems?",
      answer: "Absolutely! Our API is designed to be flexible and can be integrated with a wide range of systems. For detailed instructions, refer to our API Reference section."
    },
    // Add more FAQs as needed
  ];

  const guidesText = `Step-by-step instructions on how to use our platform and integrate it into your workflow.
Integration Guide: Learn how to integrate our product.
Customization Guide: Tailor the settings to your needs.`;

  const apiDescription = `We provide an API designed for both personal and professional projects, enabling developers to interact with Dovuchcha accounts and the ArtLab platform programmatically. Below is an example of a request and response for the ArtLab API.`;

  const apiInstructions = `To gain access to our API, please contact our support team. They will assist you in obtaining the necessary credentials and guide you through the integration process, ensuring you can leverage our API for your specific needs.`;

  const apiRequestCode = `// Using fetch to get ArtLab items
fetch('https://artlab.dovuchcha.uz/api/items', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
})
.then(response => response.json())
.then(data => {
  console.log('ArtLab Items:', data);
})
.catch(error => console.error('Error fetching ArtLab items:', error));`;

  const apiResponseCode = `{
  "items": [
    {
      "id": "item_12345",
      "title": "Sunset in Green",
      "artist": "A. Novas",
      "url": "https://artlab.dovuchcha.uz/items/item_12345",
      "tags": ["sunset", "nature", "green"]
    },
    {
      "id": "item_67890",
      "title": "Abstract Blue",
      "artist": "Z. Uvarov",
      "url": "https://artlab.dovuchcha.uz/items/item_67890",
      "tags": ["abstract", "blue"]
    }
  ],
  "count": 2
}`;

  const registrationText = `
    Registering for a Dovuchcha account provides you with a unified login to access an array of Dovuchcha services and resources. While direct self-registration through 
    <a href="https://accounts.dovuchcha.uz" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">accounts.dovuchcha.uz</a> is currently unavailable, our support team is here to assist you in setting up an account tailored to your needs.

    You can still log in with existing credentials at 
    <a href="https://accounts.dovuchcha.uz/login" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">accounts.dovuchcha.uz/login</a>, ensuring continuous access for current users.

    Once your account is created, you will be able to:
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li><strong>Dovuchcha Account Center (<a href="https://accounts.dovuchcha.uz" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">accounts.dovuchcha.uz</a>):</strong> Manage your profile details, update billing information, review security settings, and track your activity across Dovuchcha’s services.</li>
      <li><strong>Dovuchcha ArtLab (<a href="https://artlab.dovuchcha.uz" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">artlab.dovuchcha.uz</a>):</strong> Explore our curated collection of digital artworks, participate in community-driven art projects, and personalize your art collection experience.</li>
      <li><strong>Dovuchcha Domain Services (<a href="https://domain.dovuchcha.uz" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">domain.dovuchcha.uz</a>):</strong> Register and manage free subdomains for personal or professional projects, making it easier to establish an online presence under the Dovuchcha brand.</li>
    </ul>

    If you need an account, please contact our support team. They will guide you through the verification process, address any special requirements, and ensure a smooth onboarding experience. We appreciate your patience and cooperation as we work to enhance our self-service registration options in the future.
  `;

  // Highlight function for general content
  function highlightText(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, `<mark class="bg-yellow-200">$1</mark>`);
  }

  const highlightedGeneral = highlightText(generalText, searchTerm);
  const highlightedFaq = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const highlightedGuides = highlightText(guidesText, searchTerm);
  const highlightedApiDescription = highlightText(apiDescription, searchTerm);
  const highlightedApiInstructions = highlightText(apiInstructions, searchTerm);
  const highlightedRegistration = highlightText(registrationText, searchTerm);

  return (
    <div className="h-screen flex font-sans text-gray-800 bg-white relative">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-gray-50 border-r border-gray-200 flex flex-col z-30 transform transition-transform duration-200 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="py-4 px-6 border-b border-gray-200 flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h1 className="text-lg font-bold text-gray-900">Dovuchcha Support</h1>
        </div>
        <div className="p-4 border-b border-gray-200">
          <Label htmlFor="search" className="sr-only">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <ScrollArea className="flex-1 p-2 space-y-1">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <sec.icon className="h-4 w-4 text-blue-500" />
              <span>{sec.label}</span>
            </a>
          ))}
        </ScrollArea>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 overflow-hidden">
        {/* Header for Mobile */}
        <header className="md:hidden bg-white border-b border-gray-200 py-4 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-lg font-bold text-gray-900">Dovuchcha Support</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {/* General Section */}
          <section id="general" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">General</h2>
            <p className="text-gray-700 leading-7" dangerouslySetInnerHTML={{ __html: highlightedGeneral }}></p>
            
            {/* Contact Details with Icons */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">
                  Email: <a href="mailto:dovuchcha@dovuchcha.uz" className="text-blue-600 hover:underline">dovuchcha@dovuchcha.uz</a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Send className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">
                  Telegram: <a href="https://t.me/behzodmusurmonqulov" className="text-blue-600 hover:underline">Support Admin</a>
                </span>
              </div>
            </div>

            {/* Domain Information */}
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Domain Services</h3>
              <p className="text-gray-700 leading-7">
                You can check existing domains at <a href="https://domain.dovuchcha.uz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">domain.dovuchcha.uz</a>.
                If you wish to build your project under the name of Dovuchcha, you can order a new domain by contacting our support team.
              </p>
            </div>
          </section>

          {/* Registration Section */}
          <section id="registration" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration</h2>
            <div className="text-gray-700 leading-7" dangerouslySetInnerHTML={{ __html: highlightedRegistration }}></div>
          </section>

          {/* FAQ Section with Dropdowns */}
          <section id="faq" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
            {highlightedFaq.length > 0 ? (
              highlightedFaq.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} searchTerm={searchTerm} />
              ))
            ) : (
              <p className="text-gray-700">No FAQs match your search.</p>
            )}
          </section>

          {/* Guides Section */}
          <section id="guides" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Guides</h2>
            <div className="text-gray-700 leading-7" dangerouslySetInnerHTML={{ __html: highlightedGuides }}></div>
          </section>

          {/* API Reference Section */}
          <section id="api" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">API Reference</h2>
            <div className="text-gray-700 leading-7 mb-4" dangerouslySetInnerHTML={{ __html: highlightedApiDescription }}></div>

            <p className="text-gray-700 leading-7 font-semibold mb-2">Example Request (JavaScript):</p>
            <CodeBlock code={apiRequestCode} language="javascript" />

            <p className="text-gray-700 leading-7 font-semibold mb-2">Example Response (JSON):</p>
            <CodeBlock code={apiResponseCode} language="json" />

            <div className="text-gray-700 leading-7 mt-4" dangerouslySetInnerHTML={{ __html: highlightedApiInstructions }}></div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;