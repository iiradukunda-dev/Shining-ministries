import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Music, 
  Heart, 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone,
  Star,
  ChevronDown,
  Menu,
  X,
  Video
} from 'lucide-react'
import './App.css'

// Import images
import logo from './assets/logo.jpg'
import answerImage from './assets/Answer.jpg'
import members1 from './assets/Members.jpg'
import members2 from './assets/Members2.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'members', label: 'Members' },
    { id: 'events', label: 'Events' },
    { id: 'tunes', label: 'Tunes' },
    { id: 'join', label: 'Join Us' },
    { id: 'contact', label: 'Contact' }
  ]

  // Social media links
  const socialLinks = [
    { icon: Youtube, url: 'https://youtube.com/@ShiningMinistries-zb1mz?si=VpmHakXMQH9EUuCE', color: 'text-red-600' },
    { icon: Music, url: '#', color: 'text-green-600' }, // Spotify
    { icon: Instagram, url: 'https://www.instagram.com/shining_ministries?igsh=aHpkZHF2Njk4OTFh', color: 'text-pink-600' },
    { icon: Video, url: 'https://www.tiktok.com/@shining_ministries?_t=8llWRpdR3jS&_r=1', color: 'text-purple-600' }, // TikTok
    { icon: Facebook, url: 'https://www.facebook.com/shining.ministries', color: 'text-blue-600' }
  ]

  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: '2025-01-12',
      time: '14:00 PM',
      location: 'Methoditse Libre Gisenyi',
      description: 'come and experience the worship us.'
    },
    {
      id: 2,
      title: 'Youth Music Workshop',
      date: '2025-01-15',
      time: '6:00 PM',
      location: 'Community Hall',
      description: 'Special workshop for young musicians to learn and grow together.'
    },
    {
      id: 3,
      title: 'Community Outreach Concert',
      date: '2025-01-20',
      time: '7:00 PM',
      location: 'City Center',
      description: 'Free concert to spread joy and hope in our community.'
    }
  ]

  // Upcoming tunes data
  const upcomingTunes = [
    {
      id: 1,
      title: 'Light of Hope',
      artist: 'Shining Ministries',
      releaseDate: '2025-01-25',
      genre: 'Gospel',
      status: 'Coming Soon'
    },
    {
      id: 2,
      title: 'Blessed Harmony',
      artist: 'Shining Ministries',
      releaseDate: '2025-02-10',
      genre: 'Contemporary Christian',
      status: 'In Production'
    },
    {
      id: 3,
      title: 'Eternal Grace',
      artist: 'Shining Ministries',
      releaseDate: '2025-02-28',
      genre: 'Worship',
      status: 'Recording'
    }
  ]

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={logo} alt="Shining Ministries" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-xl font-bold text-amber-600">Shining Ministries</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-amber-600 hover:bg-amber-50 ${
                    activeSection === item.id ? 'text-amber-600 bg-amber-50' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-amber-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-white border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 hover:text-amber-600 hover:bg-amber-50 ${
                      activeSection === item.id ? 'text-amber-600 bg-amber-50' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-yellow-100/50"
          style={{ y: y1 }}
        />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="Shining Ministries Logo" 
              className="mx-auto h-32 w-32 rounded-full object-cover shadow-2xl mb-6"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
          >
            <span className="text-amber-600">Shining</span> Ministries
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 font-light"
          >
            Yesaya 60:1-6 - Arise, shine, for your light has come
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              onClick={() => scrollToSection('about')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Discover Our Ministry
            </Button>
            <Button 
              onClick={() => scrollToSection('join')}
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Join Our Family
            </Button>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center space-x-6 mt-12"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} hover:scale-110 transition-all duration-300 p-3 rounded-full bg-white shadow-lg hover:shadow-xl`}
              >
                <social.icon size={24} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-amber-600 cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-amber-600">Our Ministry</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Shining Ministries is a vibrant community of believers dedicated to spreading God's love through music, 
              worship, and fellowship. Based on Yesaya 60:1-6, we believe in being a light that shines in the darkness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src={answerImage} 
                alt="Ministry Leader" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
              <p className="text-gray-600 text-lg">
                We are called to be a beacon of hope and love in our community. Through contemporary Christian music, 
                worship services, and community outreach, we aim to touch hearts and transform lives.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <Users className="mx-auto text-amber-600 mb-2" size={32} />
                  <h4 className="font-semibold text-gray-800">Community</h4>
                  <p className="text-sm text-gray-600">Building strong relationships</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <Music className="mx-auto text-amber-600 mb-2" size={32} />
                  <h4 className="font-semibold text-gray-800">Music</h4>
                  <p className="text-sm text-gray-600">Inspiring worship through song</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <Heart className="mx-auto text-amber-600 mb-2" size={32} />
                  <h4 className="font-semibold text-gray-800">Love</h4>
                  <p className="text-sm text-gray-600">Spreading God's unconditional love</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <Star className="mx-auto text-amber-600 mb-2" size={32} />
                  <h4 className="font-semibold text-gray-800">Hope</h4>
                  <p className="text-sm text-gray-600">Being a light in darkness</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-amber-600">Family</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the wonderful people who make up our ministry family. Together, we create beautiful music and spread God's love.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <img 
                src={members1} 
                alt="Ministry Members" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Our Team</h3>
                  <p className="text-lg">United in faith and music</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <img 
                src={members2} 
                alt="Ministry Members" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Our Choir</h3>
                  <p className="text-lg">Voices lifted in harmony</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Upcoming <span className="text-amber-600">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for our upcoming events and be part of our growing community of faith and music.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-amber-100 text-amber-800">{event.date}</Badge>
                      <Calendar className="text-amber-600" size={20} />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{event.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      <div className="flex items-center space-x-2 mb-1">
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{event.description}</p>
                    <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tunes Section */}
      <section id="tunes" className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Upcoming <span className="text-amber-600">Tunes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get ready for our latest musical creations that will inspire and uplift your spirit.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingTunes.map((tune, index) => (
              <motion.div
                key={tune.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full bg-white hover:shadow-xl transition-all duration-300 border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        className={`${
                          tune.status === 'Coming Soon' ? 'bg-green-100 text-green-800' :
                          tune.status === 'In Production' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {tune.status}
                      </Badge>
                      <Music className="text-amber-600" size={20} />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{tune.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      <div className="space-y-1">
                        <div>by {tune.artist}</div>
                        <div className="text-sm">{tune.genre}</div>
                        <div className="text-sm font-medium">Release: {tune.releaseDate}</div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                    >
                      Get Notified
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Support Our <span className="text-amber-600">Ministry</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your generous donations help us continue our mission of spreading God's love through music and community outreach.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-800 mb-4">Choose Your Donation Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Button 
                    className="h-20 bg-yellow-600 hover:bg-yellow-700 text-white flex flex-col items-center justify-center space-y-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Phone size={24} />
                    <span className="font-semibold">MTN Mobile Money</span>
                    <span className="text-sm opacity-90">Rwanda</span>
                  </Button>
                  
                  <Button 
                    className="h-20 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center space-y-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="font-semibold">PayPal</span>
                    <span className="text-sm opacity-90">Secure Payment</span>
                  </Button>
                  
                  <Button 
                    className="h-20 bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center space-y-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-semibold">Western Union</span>
                    <span className="text-sm opacity-90">Money Transfer</span>
                  </Button>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    Every donation, no matter the size, makes a difference in our community.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-amber-600">
                    <Heart size={20} />
                    <span className="font-semibold">Thank you for your generosity!</span>
                    <Heart size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join" className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Join Our <span className="text-amber-600">Family</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Are you passionate about music and faith? We'd love to have you join our ministry family.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white border-amber-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-800">Application Form</CardTitle>
                <CardDescription className="text-center text-gray-600">
                  Fill out this form and we'll get back to you soon!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <Input placeholder="Enter your full name" className="border-amber-200 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="Enter your email" className="border-amber-200 focus:border-amber-500" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input placeholder="Enter your phone number" className="border-amber-200 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <Input type="number" placeholder="Enter your age" className="border-amber-200 focus:border-amber-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Musical Experience</label>
                  <Textarea 
                    placeholder="Tell us about your musical background and experience..."
                    className="border-amber-200 focus:border-amber-500 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join?</label>
                  <Textarea 
                    placeholder="Share your motivation for joining our ministry..."
                    className="border-amber-200 focus:border-amber-500 min-h-[100px]"
                  />
                </div>

                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Submit Application
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Get In <span className="text-amber-600">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you. Reach out to us for any questions or to learn more about our ministry.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-amber-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <Input placeholder="Your name" className="border-amber-200 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="Your email" className="border-amber-200 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea 
                      placeholder="Your message..."
                      className="border-amber-200 focus:border-amber-500 min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-amber-600" size={20} />
                    <span className="text-gray-600">info@shiningministries.org</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-amber-600" size={20} />
                    <span className="text-gray-600">+250 XXX XXX XXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-amber-600" size={20} />
                    <span className="text-gray-600">Kigali, Rwanda</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Find Us</h3>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5073648812!2d30.0588!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0x4a87a383a7b87b8e!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1641234567890!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="Shining Ministries" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-xl font-bold text-amber-400">Shining Ministries</span>
              </div>
              <p className="text-gray-400">
                Spreading God's love through music and community. Based on Yesaya 60:1-6.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>info@shiningministries.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>+250 XXX XXX XXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Rubavu, Gisenyi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Shining Ministries. All rights reserved. Made with ❤️ for God's glory.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

