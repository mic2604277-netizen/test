import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Binary,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Cpu,
  Download,
  Files,
  Fingerprint,
  GalleryHorizontal,
  GraduationCap,
  Landmark,
  LocateFixed,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import gsap from 'gsap'
import * as THREE from 'three'

const NAV_LINKS = [
  'About Us',
  'Courses',
  'Student Zone',
  'Results',
  'Franchise',
  'Download',
  'Gallery',
  'Contact',
]

const TICKER_TEXT = [
  'Admission is Going On...',
  'Contact for Franchisee Opening.',
  'Enroll Today, Empower Tomorrow.',
  'Become a Part of Our Vision for the Future.',
  'Shaping Minds, Shaping Futures.',
  'Dream Big, Learn Bigger.',
  'Unleashing Potential, Igniting Passion.',
  'Your Success Starts Here.',
  'Together, We Learn, Grow, and Succeed.',
  'Discover, Learn, Succeed.',
  'Excellence Through Education.',
]

const COURSES = [
  {
    code: 'DCA',
    name: 'Diploma in Computer Application',
    duration: 'Six Months',
    description:
      'Build confidence with computer fundamentals, office productivity tools, internet workflows, and practical project tasks for entry-level digital careers.',
    highlight: 'Ideal for beginners who want job-ready office and computer skills.',
  },
  {
    code: 'ADCA',
    name: 'Advance Diploma in Computer Application',
    duration: 'Six Months',
    description:
      'Advance beyond basics with productivity systems, data handling, communication tools, presentation strategy, and computer problem-solving routines.',
    highlight: 'Strong progression track after DCA for broader opportunities.',
  },
  {
    code: 'Tally',
    name: 'Financial Accounting',
    duration: 'Three Months',
    description:
      'Master computerized accounting workflows, voucher entry, GST-ready bookkeeping logic, and reporting routines used by modern businesses.',
    highlight: 'Perfect for finance clerks, accountants, and commerce students.',
  },
  {
    code: 'DTP',
    name: 'Desktop Publishing',
    duration: 'Six Months',
    description:
      'Create print-ready designs for brochures, posters, certificates, and educational materials while learning layout principles and typography foundations.',
    highlight: 'Excellent for creative students entering publishing and print services.',
  },
  {
    code: 'DOA',
    name: 'Diploma in Office Automation',
    duration: 'Six Months',
    description:
      'Learn office automation best practices, document workflows, communication standards, and structured data operations for administrative excellence.',
    highlight: 'Designed for administrative and front-office career pathways.',
  },
  {
    code: 'ADIT',
    name: 'Advance Diploma in Information Technology',
    duration: 'Twelve Months',
    description:
      'Develop a robust IT foundation through software tools, operating environments, hardware awareness, network basics, and productivity engineering.',
    highlight: 'Comprehensive long-term IT development for ambitious learners.',
  },
  {
    code: 'ADCP',
    name: 'Advance Diploma in Computer Programming',
    duration: 'Twelve Months',
    description:
      'Study structured logic, coding discipline, algorithmic thinking, debugging practice, and real-world project implementation patterns.',
    highlight: 'Focused pathway for students targeting software development careers.',
  },
  {
    code: 'ADHN',
    name: 'Advance Diploma in Hardware Networking',
    duration: 'Twelve Months',
    description:
      'Understand computer hardware maintenance, diagnostics, basic networking, configuration standards, and practical support workflows.',
    highlight: 'Great for technical support and hardware-service entrepreneurs.',
  },
  {
    code: 'Typing',
    name: 'Typing & Productivity Mastery',
    duration: 'Six Months',
    description:
      'Increase typing speed and accuracy through guided drills, bilingual practice, exam preparation, and time-saving keyboard discipline.',
    highlight: 'Boosts employability for data-entry, office, and exam-focused roles.',
  },
  {
    code: 'CFA',
    name: 'Certificate in Financial Accounting',
    duration: 'Three Months',
    description:
      'A compact accounting program for fast-track proficiency in financial entry systems, record management, and reporting essentials.',
    highlight: 'Short-term certification with immediate practical relevance.',
  },
  {
    code: 'CCA',
    name: 'Certificate in Computer Application',
    duration: 'One Month',
    description:
      'An intensive short format covering practical digital literacy, document handling, communication tools, and workplace computer essentials.',
    highlight: 'Fast onboarding for students needing rapid computer readiness.',
  },
  {
    code: 'DCTT',
    name: 'Diploma in Computer Teacher Training',
    duration: 'Eighteen Months',
    description:
      'Prepare for training and teaching roles with instructional methods, lab management, classroom delivery, and curriculum execution skills.',
    highlight: 'Professional route for future computer educators and instructors.',
  },
]

const VERIFICATION_TABS = {
  registration: {
    label: 'Registration',
    title: 'Registration Verification Gateway',
    description:
      'Validate student registration records in real-time using secure enrollment identifiers issued by ICA.',
    fields: [
      { id: 'regNo', label: 'Registration Number', placeholder: 'ICA-REG-2026-XXXX' },
      { id: 'fullName', label: 'Student Full Name', placeholder: 'Enter candidate name' },
      { id: 'dob', label: 'Date of Birth', placeholder: 'DD-MM-YYYY' },
    ],
  },
  icard: {
    label: 'I-Card',
    title: 'I-Card Verification Node',
    description:
      'Authenticate student identity cards through card ID lookup and center mapping protocols.',
    fields: [
      { id: 'idCardNo', label: 'I-Card Number', placeholder: 'ICA-ID-XXXXXX' },
      { id: 'centerCode', label: 'Centre Code', placeholder: 'CTR-###' },
      { id: 'issueYear', label: 'Issue Year', placeholder: 'YYYY' },
    ],
  },
  marksheet: {
    label: 'Marksheet',
    title: 'Marksheet Verification Console',
    description:
      'Confirm marksheet authenticity using roll number and exam session references.',
    fields: [
      { id: 'rollNo', label: 'Roll Number', placeholder: 'ROLL-2026-XXXX' },
      { id: 'examSession', label: 'Exam Session', placeholder: 'e.g., Jan-2026' },
      { id: 'courseCode', label: 'Course Code', placeholder: 'DCA / ADCA / DCTT ...' },
    ],
  },
  certificate: {
    label: 'Certificate',
    title: 'Certificate Validation Core',
    description:
      'Cross-check certificate issuance records with secure ICA certificate serial numbers.',
    fields: [
      { id: 'certNo', label: 'Certificate Serial Number', placeholder: 'CERT-ICA-XXXXXX' },
      { id: 'candidate', label: 'Candidate Name', placeholder: 'Enter candidate name' },
      { id: 'completion', label: 'Completion Year', placeholder: 'YYYY' },
    ],
  },
  typing: {
    label: 'Typing Certificate',
    title: 'Typing Certificate Verification Grid',
    description:
      'Verify typing exam credentials with language mode, grade, and typing certificate number.',
    fields: [
      { id: 'typingNo', label: 'Typing Certificate Number', placeholder: 'TYPE-ICA-XXXX' },
      { id: 'language', label: 'Language Mode', placeholder: 'English / Hindi' },
      { id: 'grade', label: 'Grade / Speed', placeholder: 'e.g., 40 WPM, Grade A' },
    ],
  },
}

const NEWS_ITEMS = [
  {
    tag: 'Admission Open 2026',
    title: 'New Batches Open for DCA, ADCA, and DCTT',
    content:
      'Fresh weekday and weekend batches are now open with structured lab schedules, mentor-led doubt sessions, and certification-focused assessments.',
  },
  {
    tag: 'Industry Ready',
    title: 'Typing + Office Productivity Intensive Bootcamp',
    content:
      'A practical speed-and-accuracy bootcamp designed for students preparing for data-entry jobs, clerical exams, and office automation roles.',
  },
  {
    tag: 'Franchise Growth',
    title: 'Franchise Support Program Expanded Across India',
    content:
      'ICA now provides centralized academic kits, admissions guidance, digital promotion templates, and examiner support for new franchise centres.',
  },
  {
    tag: 'Placement Focus',
    title: 'Mock Interview and Resume Lab for Final Semester Students',
    content:
      'Graduating learners get guided profile-building, practical interview simulations, and job communication training for entry-level tech opportunities.',
  },
]

const GALLERY_ITEMS = [
  {
    title: 'Certificate Distribution Ceremony',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Celebrating milestones with verified completion certificates.',
  },
  {
    title: 'Digital Lab Session',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Hands-on practical classes with guided instructor support.',
  },
  {
    title: 'Typing Skill Assessment',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Accuracy and speed drills for exam and job readiness.',
  },
  {
    title: 'Franchise Orientation Meet',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Centre onboarding for entrepreneurs joining ICA network.',
  },
  {
    title: 'Creative DTP Workshop',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Design fundamentals, publishing workflow, and print output.',
  },
  {
    title: 'Advanced IT Practical',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'System operations, tool stacks, and live practical modules.',
  },
]

const FRANCHISE_STEPS = [
  {
    step: '01',
    title: 'Application & Screening',
    detail:
      'Submit your franchise intent with local market details. ICA evaluates location potential, training demand, and growth feasibility.',
  },
  {
    step: '02',
    title: 'Agreement & Setup Blueprint',
    detail:
      'Receive brand guidelines, infrastructure checklist, legal documentation support, and centre-launch standard operating procedures.',
  },
  {
    step: '03',
    title: 'Academic Enablement',
    detail:
      'Access ICA curriculum kits, assessment templates, timetable frameworks, and trainer orientation for smooth batch execution.',
  },
  {
    step: '04',
    title: 'Marketing & Admissions Launch',
    detail:
      'Activate digital creatives, social campaigns, and local admissions outreach backed by ICA central branding and communication assets.',
  },
  {
    step: '05',
    title: 'Verification & Certification Support',
    detail:
      'Operate with ICA’s verification-first ecosystem for registration, marksheet, and certificate authenticity at institutional standards.',
  },
]

const STUDENT_SUCCESS_STORIES = [
  {
    name: 'Anjali Kumari',
    program: 'ADCA',
    summary:
      'Completed ADCA with distinction and now works in office operations handling documentation, spreadsheets, and digital workflow management.',
  },
  {
    name: 'Rahul Raj',
    program: 'Tally + CFA',
    summary:
      'Transitioned from manual bookkeeping to computerized accounting and secured a junior accountant role in a local firm.',
  },
  {
    name: 'Nisha Verma',
    program: 'DCTT',
    summary:
      'After teacher training, she now leads computer fundamentals and typing sessions for beginner learners in a district centre.',
  },
  {
    name: 'Amit Singh',
    program: 'ADHN',
    summary:
      'Started a small technical support service offering desktop repair, network setup, and preventive maintenance for nearby offices.',
  },
  {
    name: 'Pooja Sharma',
    program: 'Typing',
    summary:
      'Improved typing speed from 18 WPM to 48 WPM and successfully qualified for multiple clerical and data-entry exams.',
  },
  {
    name: 'Saurabh Kumar',
    program: 'ADCP',
    summary:
      'Built practical confidence in coding and problem-solving and now contributes to small freelance software and web projects.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Do ICA courses include practical lab sessions?',
    a: 'Yes. Every program includes practical lab guidance, structured assignments, and instructor support to ensure hands-on learning outcomes.',
  },
  {
    q: 'Can I verify registration, marksheet, and certificates online?',
    a: 'Yes. ICA provides dedicated verification options for registration, I-Card, marksheet, certificate, and typing credentials.',
  },
  {
    q: 'Is franchise support available outside Bihar?',
    a: 'Yes. ICA supports expansion in multiple regions with onboarding, branding, academic kits, and operating support.',
  },
  {
    q: 'Which course is best after 10th/12th for computer careers?',
    a: 'DCA is a strong foundation. Students can advance to ADCA, ADIT, ADCP, or DCTT based on their career preference.',
  },
  {
    q: 'Do short-term programs provide certification?',
    a: 'Yes. Short-term programs like CCA and CFA include completion certification on meeting required academic standards.',
  },
]

const FALLBACK_FRANCHISES = [
  { name: 'AMBAR KUMAR', centre_name: 'Masaurhi Computer Education Centre', profile_photo: '/resources/franchise/franchise_profile_photo/franchise_profile_photo_D69Tv.PNG' },
  { name: 'NANDAN RAJ KESHRI', centre_name: 'Vedanta Computer Training Centre, Paliganj, Patna', profile_photo: '/resources/franchise/franchise_profile_photo/profile_photo_KLxyY.jpeg' },
  { name: 'RAHUL KUMAR', centre_name: 'Vedanta Computer Training Centre, Chandhos, Patna', profile_photo: '/resources/franchise/franchise_profile_photo/profile_photo_6ZgMA.jpg' },
  { name: 'AJIT KKUMAR', centre_name: 'I- Comet Computer Education Centre , Arwal', profile_photo: '/resources/franchise/franchise_profile_photo/franchise_profile_photo_QXSVl.jpeg' },
  { name: 'CHANDAN KUMAR', centre_name: 'I- Comet Computer Education Centre ,Prasadi English', profile_photo: '/resources/franchise/franchise_profile_photo/profile_photo_ESi2S.jpg' },
  { name: 'RAUNAK SINGH', centre_name: 'Idea Computer', profile_photo: '/resources/franchise/franchise_profile_photo/franchise_profile_photo_90dSg.jpg' },
  { name: 'RUNA DEVI', centre_name: 'arti inst on tech', profile_photo: '/resources/franchise/franchise_profile_photo/franchise_profile_photo_pMcVJ.jpg' },
  { name: 'RANJAN SINGH CHAUHAN', centre_name: 'SOFTTECH COMPUTER', profile_photo: '/resources/franchise/franchise_profile_photo/profile_photo_lkLrF.jpg' },
  { name: 'SUSHIL KUMAR', centre_name: 'Mahi Computer Institute, Jamui (Patna)', profile_photo: '/resources/franchise/franchise_profile_photo/franchise_profile_photo_C954w.jpeg' },
  { name: 'AKASH KUMAR', centre_name: 'Abhyaas Computer Institute (Patna)', profile_photo: '/resources/franchise/franchise_profile_photo/franchise_profile_photo_HRhY5.jpeg' },
  { name: 'KRISHNA KUMAR GOLU', centre_name: 'High Digital Computer Classes, Shahar Telpa [Arwal]', profile_photo: '/resources/franchise/franchise_profile_photo/profile_photo_IntSv.jpeg' },
  { name: 'HARENDRA KUMAR', centre_name: 'Fast Tech Computer Centre, Baidrabad, (Arwal)', profile_photo: '/resources/franchise/franchise_profile_photo/franchise_profile_photo_rPgYH.jpeg' },
]

const toFranchisePhotoUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=320&q=80'
  if (path.startsWith('http')) return path
  return `https://admin.improvencomputer.in${path}`
}

function formatClock(date) {
  const weekdayMap = {
    Sun: 'Sun',
    Mon: 'Mon',
    Tue: 'Tues',
    Wed: 'Wed',
    Thu: 'Thu',
    Fri: 'Fri',
    Sat: 'Sat',
  }

  const week = weekdayMap[date.toLocaleDateString('en-US', { weekday: 'short' })]
  const day = String(date.getDate()).padStart(2, '0')
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()

  let hour = date.getHours()
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')
  const ampm = hour >= 12 ? 'pm' : 'am'
  hour = hour % 12
  hour = hour === 0 ? 12 : hour

  return `${week}, ${day}-${month}-${year} | ${hour}:${minute}:${second} ${ampm}`
}

function HeroThreeMatrix() {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const container = wrapperRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 1.8, 7)

    const ambient = new THREE.AmbientLight(0x5a8ccf, 0.45)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0x22d3ee, 1.3)
    keyLight.position.set(4, 7, 2)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 0.9)
    rimLight.position.set(-5, 4, -3)
    scene.add(rimLight)

    const pointPulse = new THREE.PointLight(0x22d3ee, 1.7, 30)
    pointPulse.position.set(0, 2, 0)
    scene.add(pointPulse)

    const matrixGroup = new THREE.Group()
    scene.add(matrixGroup)

    const keyboardRows = [
      '1234567890-=',
      'QWERTYUIOP[]',
      'ASDFGHJKL;\'',
      'ZXCVBNM,./',
    ]

    const keyMeshes = []

    keyboardRows.forEach((row, rowIndex) => {
      const y = 0.9 - rowIndex * 0.45
      const rowOffset = rowIndex * 0.17
      ;[...row].forEach((char, charIndex) => {
        const geometry = new THREE.BoxGeometry(0.33, 0.1, 0.33)
        const material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#13253f'),
          transmission: 0.35,
          roughness: 0.2,
          metalness: 0.3,
          thickness: 1.8,
          ior: 1.15,
          clearcoat: 0.6,
          clearcoatRoughness: 0.2,
          emissive: new THREE.Color('#000000'),
          emissiveIntensity: 0,
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = charIndex * 0.42 - row.length * 0.21 + rowOffset
        mesh.position.y = y
        mesh.position.z = 0
        mesh.userData = {
          char: char.toLowerCase(),
          baseY: y,
          pulseSeed: Math.random() * Math.PI * 2,
        }

        matrixGroup.add(mesh)
        keyMeshes.push(mesh)
      })
    })

    matrixGroup.position.set(0, -0.6, 0)

    const cpuGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2)
    const cpuMaterial = new THREE.MeshStandardMaterial({
      color: '#8b5cf6',
      metalness: 0.6,
      roughness: 0.25,
      emissive: '#1a0d3d',
      emissiveIntensity: 0.9,
    })
    const cpuMesh = new THREE.Mesh(cpuGeometry, cpuMaterial)
    cpuMesh.position.set(-3.1, 1.5, -1.2)
    scene.add(cpuMesh)

    const sphereGeometry = new THREE.SphereGeometry(0.9, 42, 42)
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0.28,
      roughness: 0,
      metalness: 0,
      transmission: 1,
      thickness: 1.4,
      emissive: '#113c51',
      emissiveIntensity: 0.7,
    })
    const holoSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    holoSphere.position.set(3, 1.2, -1.8)
    scene.add(holoSphere)

    const orbRingGeometry = new THREE.TorusGeometry(1.15, 0.05, 18, 80)
    const orbRingMaterial = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      emissive: '#22d3ee',
      emissiveIntensity: 1.2,
      metalness: 0.5,
      roughness: 0.3,
    })
    const orbRing = new THREE.Mesh(orbRingGeometry, orbRingMaterial)
    orbRing.position.copy(holoSphere.position)
    orbRing.rotation.x = Math.PI / 2.8
    scene.add(orbRing)

    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 1400
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 24
      positions[i3 + 1] = (Math.random() - 0.5) * 14
      positions[i3 + 2] = (Math.random() - 0.5) * 12 - 2
      scales[i] = 0.4 + Math.random() * 1.4
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    const particleMaterial = new THREE.PointsMaterial({
      color: '#a5f3fc',
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleField = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleField)

    let pointerX = 0
    let pointerY = 0

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointerY = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    const keyDownSet = new Set()
    const activeBrightness = new THREE.Color('#22d3ee')

    const onKeyDown = (event) => {
      keyDownSet.add(event.key.toLowerCase())
    }

    const onKeyUp = (event) => {
      keyDownSet.delete(event.key.toLowerCase())
    }

    container.addEventListener('pointermove', onPointerMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    const clock = new THREE.Clock()

    let rafId = 0
    const animate = () => {
      const elapsed = clock.getElapsedTime()

      cpuMesh.rotation.x = elapsed * 0.2
      cpuMesh.rotation.y = elapsed * 0.35
      cpuMesh.position.y = 1.5 + Math.sin(elapsed * 1.1) * 0.3

      holoSphere.rotation.y = elapsed * 0.25
      holoSphere.position.y = 1.2 + Math.sin(elapsed * 1.4 + 1.2) * 0.22

      orbRing.rotation.z = elapsed * 0.6
      orbRing.rotation.x = Math.PI / 2.8 + Math.sin(elapsed) * 0.2
      orbRing.position.y = holoSphere.position.y

      particleField.rotation.y = elapsed * 0.05
      particleField.rotation.x = Math.sin(elapsed * 0.2) * 0.08

      matrixGroup.rotation.y += (pointerX * 0.38 - matrixGroup.rotation.y) * 0.04
      matrixGroup.rotation.x += (pointerY * 0.22 - matrixGroup.rotation.x) * 0.04

      keyMeshes.forEach((mesh, index) => {
        const t = elapsed * 1.8 + mesh.userData.pulseSeed + index * 0.03
        mesh.position.y = mesh.userData.baseY + Math.sin(t) * 0.02

        const isDown = keyDownSet.has(mesh.userData.char)
        const material = mesh.material

        if (isDown) {
          material.color.lerp(activeBrightness, 0.25)
          material.emissive.set('#8b5cf6')
          material.emissiveIntensity = 1.7
          mesh.position.y = mesh.userData.baseY + 0.06
        } else {
          material.color.lerp(new THREE.Color('#13253f'), 0.2)
          material.emissive.set('#000000')
          material.emissiveIntensity = 0
        }
      })

      pointPulse.intensity = 1.3 + Math.sin(elapsed * 2.2) * 0.4

      camera.position.x += ((pointerX * 0.6) - camera.position.x) * 0.03
      camera.position.y += (1.8 + pointerY * 0.3 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      container.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })

      renderer.dispose()
    }
  }, [])

  return (
    <div ref={wrapperRef} className="hero-canvas absolute inset-0 -z-10 h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

function RealtimeClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(id)
  }, [])

  return <span className="font-medium tracking-wide text-cyan-100">{formatClock(now)}</span>
}

function AnimatedCounter({ end, suffix, label, icon: Icon, theme = 'cyan' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frameId = 0
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return

        started = true
        const duration = 1500
        const startTime = performance.now()

        const step = (time) => {
          const progress = Math.min((time - startTime) / duration, 1)
          const eased = 1 - (1 - progress) ** 3
          setValue(Math.floor(end * eased))

          if (progress < 1) {
            frameId = requestAnimationFrame(step)
          }
        }

        frameId = requestAnimationFrame(step)
      },
      { threshold: 0.45 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [end])

  return (
    <article
      ref={ref}
      className={`counter-card rounded-3xl border p-6 backdrop-blur-xl ${
        theme === 'cyan'
          ? 'border-cyan-400/40 bg-cyan-400/10'
          : 'border-violet-400/40 bg-violet-400/10'
      }`}
    >
      <Icon className={`mb-3 ${theme === 'cyan' ? 'text-cyan-300' : 'text-violet-300'}`} size={28} />
      <h3 className="text-4xl font-black md:text-5xl">{value.toLocaleString()}{suffix}</h3>
      <p className="mt-2 text-sm text-white/85 md:text-base">{label}</p>
    </article>
  )
}

function VerificationPortal() {
  const [activeTab, setActiveTab] = useState('registration')
  const tab = VERIFICATION_TABS[activeTab]

  return (
    <section id="verification" className="relative mx-auto mt-16 max-w-7xl px-4 pb-14">
      <div className="glass-shell rounded-[1.75rem] border border-white/10 p-5 md:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
              <ShieldCheck size={14} />
              Verification Hub
            </p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">Security Dashboard for Real-Time Validation</h2>
          </div>
          <div className="rounded-2xl border border-emerald-300/35 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-300">
            Encrypted ICA Verification Protocol Active
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-3">
            {Object.entries(VERIFICATION_TABS).map(([key, info]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`mb-2 flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition ${
                  activeTab === key
                    ? 'border-cyan-300/70 bg-cyan-300/15 text-white'
                    : 'border-white/10 bg-white/5 text-white/80 hover:border-cyan-300/40 hover:text-white'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Shield size={14} className={activeTab === key ? 'text-cyan-200' : 'text-white/70'} />
                  {info.label}
                </span>
                <ChevronRight size={14} />
              </button>
            ))}
          </aside>

          <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 md:p-7">
            <h3 className="text-xl font-bold md:text-2xl">{tab.title}</h3>
            <p className="mt-2 text-sm text-white/80 md:text-base">{tab.description}</p>

            <form className="mt-5 grid gap-4 md:grid-cols-2">
              {tab.fields.map((field, index) => (
                <label key={field.id} className={`cyber-input ${index === 2 ? 'md:col-span-2' : ''}`}>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">{field.label}</span>
                  <input type="text" name={field.id} placeholder={field.placeholder} className="w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none" />
                </label>
              ))}

              <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
                >
                  <Fingerprint size={16} />
                  Verify Now
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
                >
                  <Download size={16} />
                  Download Verification Report
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </section>
  )
}

function CourseBento() {
  return (
    <section id="courses" className="mx-auto mt-14 max-w-7xl px-4">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-violet-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-200">
            <BookOpen size={14} />
            Course Matrix
          </p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">Future-Ready Programs in Bento Grid Layout</h2>
        </div>
        <p className="max-w-xl text-sm text-white/75 md:text-base">
          Explore ICA’s complete curriculum across foundational applications, advanced diplomas, accounting, desktop publishing,
          networking, programming, typing, and instructor training tracks.
        </p>
      </div>

      <div className="bento-grid">
        {COURSES.map((course, idx) => (
          <article
            key={course.code}
            className={`course-card glass-shell ${idx % 5 === 0 ? 'course-lg' : ''} ${idx % 4 === 0 ? 'course-wide' : ''}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full border border-cyan-300/50 bg-cyan-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                {course.code}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-violet-200">
                <Clock3 size={13} /> {course.duration}
              </span>
            </div>

            <h3 className="text-lg font-bold leading-tight md:text-xl">{course.name}</h3>
            <p className="mt-2 text-sm text-white/80">{course.description}</p>
            <p className="mt-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/85">{course.highlight}</p>

            <button
              type="button"
              className="course-action mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/90"
            >
              Read More
              <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function DirectorsSuite() {
  return (
    <section id="about" className="mx-auto mt-16 max-w-7xl px-4">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="glass-shell rounded-[1.75rem] border border-white/10 p-6 md:p-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
            <Sparkles size={14} />
            The Director’s Suite
          </p>
          <h2 className="mt-4 text-2xl font-extrabold md:text-3xl">A Message from the Director</h2>
          <p className="mt-4 text-sm leading-7 text-white/88 md:text-base">
            Greetings and welcome to the Improven Computer Academy (ICA). It is my honor as the Director to share insights into
            our institution, where we strive to provide unparalleled education in the realm of computer science and technology. Our
            flagship programs, including the Diploma in Computer Applications (DCA), Advanced Diploma in Computer Applications
            (ADCA), and specialized typing and office automation courses, are designed to equip students with essential skills for a
            dynamic and competitive industry.
          </p>
          <p className="mt-4 text-sm leading-7 text-white/88 md:text-base">
            At ICA, we are committed to offering a curriculum that is both comprehensive and adaptable, ensuring our students
            receive an education that is relevant and forward-thinking. Our dedicated faculty members bring a wealth of industry
            experience and academic expertise, creating an enriching environment for learning and innovation. The integration of
            hands-on training with theoretical instruction enables our students to gain practical experience, making them well-prepared
            for various career paths in technology.
          </p>
          <p className="mt-4 text-sm leading-7 text-white/88 md:text-base">
            Thank you for your interest in ICA. Your support and participation are vital to our mission of advancing technology
            education and fostering a community of skilled and innovative professionals. Together, we are shaping the future of
            technology.
          </p>

          <div className="mt-5 rounded-2xl border border-violet-300/40 bg-violet-300/10 p-4 text-lg font-semibold text-violet-100">
            “Shaping Minds, Shaping Futures.”
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <h3 className="mb-2 inline-flex items-center gap-2 font-bold text-cyan-100">
                <MapPin size={16} /> Bihar HQ Coordinates
              </h3>
              <p className="text-sm text-white/85">Latitude: 25.250400° N</p>
              <p className="text-sm text-white/85">Longitude: 84.775400° E</p>
              <p className="mt-2 text-xs text-white/70">Near RLSY College, Dharhara Paliganj, Patna - 801110, Bihar, India</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <h3 className="mb-2 inline-flex items-center gap-2 font-bold text-violet-200">
                <LocateFixed size={16} /> Bengaluru Office Coordinates
              </h3>
              <p className="text-sm text-white/85">Latitude: 12.840600° N</p>
              <p className="text-sm text-white/85">Longitude: 77.679300° E</p>
              <p className="mt-2 text-xs text-white/70">
                4th Floor, Dr. B.R. Ambedkar Main Road, Hebbagodi, Bengaluru, Karnataka - 560099, India
              </p>
            </div>
          </div>
        </article>

        <aside className="glass-shell flex flex-col rounded-[1.75rem] border border-white/10 p-6">
          <div className="relative mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full border border-cyan-300/50">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80" alt="Director of Improven Computer Academy" className="h-full w-full object-cover" />
          </div>
          <h3 className="text-center text-xl font-bold">Letter From Director</h3>
          <p className="mt-3 text-sm leading-7 text-white/84">
            In today’s generation knowledge of computer has became an essential part of life and livelihood. To bring out this
            revolution more powerful Improven Computer Academy offers various Short and Long Term courses which would help in
            enhancing your knowledge and hence boosting your moral.
          </p>
          <p className="mt-4 text-sm font-semibold text-cyan-100">Warm Regards,</p>
          <p className="text-sm text-white/80">Director</p>

          <div className="mt-6 space-y-3 text-sm">
            <div className="rounded-xl border border-white/15 bg-white/5 p-3">
              <p className="inline-flex items-center gap-2 text-white/85"><Mail size={15} /> info@improvencomputer.in</p>
              <p className="inline-flex items-center gap-2 text-white/85"><Mail size={15} /> improvencomputer801110@gmail.com</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-3">
              <p className="inline-flex items-center gap-2 text-white/85"><Phone size={15} /> Contact support available at centre desks.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function LiveFranchiseGrid() {
  const [franchises, setFranchises] = useState(FALLBACK_FRANCHISES)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const controller = new AbortController()

    const fetchFranchises = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://admin.improvencomputer.in/api/public/franchises', { signal: controller.signal })
        if (!response.ok) throw new Error(`Failed with status ${response.status}`)
        const data = await response.json()
        if (!ignore && Array.isArray(data?.franchises) && data.franchises.length > 0) {
          setFranchises(data.franchises)
          setError('')
        }
      } catch (err) {
        if (!ignore) {
          setError('Live API temporarily unavailable. Showing latest cached centre roster.')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchFranchises()
    return () => {
      ignore = true
      controller.abort()
    }
  }, [])

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
            <Building2 size={14} />
            Live Franchise Network
          </p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">Registered ICA Centre Leaders (Live API Powered)</h2>
        </div>
        <p className="max-w-xl text-sm text-white/76 md:text-base">
          This section reads from your public franchises API and auto-updates centre cards with profile photos and centre names.
        </p>
      </div>

      <div className="mb-3 flex items-center justify-between text-xs text-white/70">
        <span>{loading ? 'Syncing centre data...' : `Loaded ${franchises.length} centres`}</span>
        <span className="rounded-full border border-white/20 px-2 py-1">Source: /api/public/franchises</span>
      </div>
      {error ? <p className="mb-4 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">{error}</p> : null}

      <div className="franchise-live-grid">
        {franchises.map((item, idx) => (
          <article key={`${item.name}-${idx}`} className="franchise-live-card">
            <div className="relative h-28 overflow-hidden rounded-xl border border-white/15">
              <img src={toFranchisePhotoUrl(item.profile_photo)} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/70 via-transparent to-transparent" />
            </div>
            <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.05em] text-cyan-50">{item.name}</h3>
            <p className="mt-1 text-xs leading-6 text-white/82">{item.centre_name}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function FooterMatrix() {
  const otherLinks = [
    'Registration Verification',
    'I-Card Verification',
    'Marksheet Verification',
    'Certificate Verification',
    'Typing Certificate',
    'Gallery',
    'About ICA',
    'Mission & Vision',
    'Incorporation Certificate',
    'ISO Certificate',
    'Trade Mark',
    'MSME, Govt of India',
    'PAN Card',
    'Central Vigilance Commission',
  ]

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/30 px-4 pb-10 pt-10">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
        <section className="glass-shell rounded-2xl border border-cyan-400/30 p-5">
          <h3 className="mb-3 inline-flex items-center gap-2 text-lg font-bold text-cyan-100">
            <Landmark size={18} /> Bihar HQ
          </h3>
          <p className="text-sm text-white/85">
            IMPROVEN COMPUTER ACADEMY PRIVATE LIMITED, Near RLSY College, Dharhara Paliganj, Patna-801110, Bihar, INDIA
          </p>
        </section>

        <section className="glass-shell rounded-2xl border border-violet-400/30 p-5">
          <h3 className="mb-3 inline-flex items-center gap-2 text-lg font-bold text-violet-100">
            <Building2 size={18} /> Corporate Office
          </h3>
          <p className="text-sm text-white/85">
            4th Floor, Dr. B.R. Ambedkar, Main Road, Hebbagodi, Bengaluru, Karnataka-560099, INDIA
          </p>
        </section>

        <section className="glass-shell rounded-2xl border border-white/20 p-5">
          <h3 className="mb-3 inline-flex items-center gap-2 text-lg font-bold text-white">
            <Files size={18} /> Other Links
          </h3>
          <div className="grid grid-cols-1 gap-2 text-sm text-white/80">
            {otherLinks.map((link) => (
              <a key={link} href="#" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 transition hover:border-cyan-300/45 hover:text-cyan-100">
                <CircleDot size={12} /> {link}
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto mt-7 flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs text-white/70">
        <p className="inline-flex items-center gap-2">
          <BadgeCheck size={14} className="text-emerald-300" />
          ISO Certified · MSME Registered · Trade Mark Protected
        </p>
        <p>Copyright © 2020-2026 improvencomputer.in | Developed & Maintained By Improven Computer Academy Pvt Ltd.</p>
      </div>
    </footer>
  )
}

function NewsPulseSection() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
            <Sparkles size={14} />
            Latest News
          </p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">ICA News Pulse & Announcement Grid</h2>
        </div>
        <p className="max-w-xl text-sm text-white/75 md:text-base">
          Stay updated on admissions, certification cycles, student success events, and franchise opportunities across ICA centres.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {NEWS_ITEMS.map((item) => (
          <article key={item.title} className="news-card glass-shell rounded-2xl border border-white/15 p-5">
            <p className="mb-2 inline-flex rounded-full border border-violet-300/45 bg-violet-300/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-100">
              {item.tag}
            </p>
            <h3 className="text-lg font-bold md:text-xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/82">{item.content}</p>
            <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/45 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
              Explore Update <ArrowRight size={13} />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function GalleryShowcase() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-violet-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-100">
            <GalleryHorizontal size={14} />
            Media Gallery
          </p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">Certificate Distribution & Event Highlights</h2>
        </div>
        <p className="max-w-xl text-sm text-white/75 md:text-base">
          A visual timeline of ICA’s classroom moments, practical training sessions, certification ceremonies, and growth initiatives.
        </p>
      </div>

      <div className="gallery-grid">
        {GALLERY_ITEMS.map((item, idx) => (
          <article key={item.title} className={`gallery-card ${idx % 5 === 0 ? 'gallery-tall' : ''}`}>
            <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
            <div className="gallery-overlay">
              <h3 className="text-sm font-bold md:text-base">{item.title}</h3>
              <p className="mt-1 text-xs text-white/80">{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FranchiseLaunchPad() {
  return (
    <section id="franchise" className="mx-auto mt-16 max-w-7xl px-4">
      <div className="glass-shell rounded-[1.7rem] border border-white/10 p-5 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
              <Building2 size={14} />
              Franchise Launchpad
            </p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">Build Your Own ICA Centre with Structured Guidance</h2>
          </div>
          <p className="max-w-xl text-sm text-white/76 md:text-base">
            Join ICA’s education network with end-to-end support for operations, academics, admissions, and official verification systems.
          </p>
        </div>

        <div className="franchise-track">
          {FRANCHISE_STEPS.map((item) => (
            <article key={item.step} className="fr-step">
              <div className="fr-step-top">
                <span className="fr-badge">{item.step}</span>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm text-white/82">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SuccessWall() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
            <GraduationCap size={14} />
            Student Success Wall
          </p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">Real Learners. Real Outcomes. Real Career Momentum.</h2>
        </div>
        <p className="max-w-xl text-sm text-white/75 md:text-base">
          ICA programs are designed to produce practical confidence with measurable growth in employability, communication, and digital productivity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {STUDENT_SUCCESS_STORIES.map((story) => (
          <article key={story.name} className="glass-shell success-card rounded-2xl border border-white/15 p-5">
            <h3 className="text-lg font-bold">{story.name}</h3>
            <p className="mt-1 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-2 py-0.5 text-xs font-semibold text-cyan-100">
              {story.program}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/82">{story.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function WhyChooseICA() {
  const points = [
    'Future-focused curriculum designed for practical employability.',
    'Dedicated typing and productivity development track.',
    'Verification-first ecosystem for trust and institutional credibility.',
    'Franchise support with operational and academic enablement.',
    'Affordable pathways from beginner to advanced technology programs.',
    'Long-term focus on discipline, confidence, and professional growth.',
  ]

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="glass-shell rounded-[1.7rem] border border-white/10 p-6 md:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold md:text-4xl">Why Students & Centres Choose ICA</h2>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/45 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
            <ShieldCheck size={14} />
            Trusted Learning Network
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {points.map((point, idx) => (
            <article key={point} className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="inline-flex items-start gap-2 text-sm leading-7 text-white/86">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-violet-300/45 bg-violet-300/10 text-[11px] font-bold text-violet-100">
                  {idx + 1}
                </span>
                {point}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="mb-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
          <BookOpen size={14} />
          Frequently Asked Questions
        </p>
        <h2 className="mt-3 text-2xl font-extrabold md:text-4xl">Admissions, Courses, Verification & Franchise FAQs</h2>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => (
          <article key={item.q} className="glass-shell faq-item rounded-2xl border border-white/15 p-5">
            <h3 className="text-base font-bold md:text-lg">{item.q}</h3>
            <p className="mt-2 text-sm leading-7 text-white/82">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function CTAFinal() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="cta-panel rounded-[1.9rem] border border-cyan-300/35 p-6 md:p-9">
        <div className="grid items-center gap-5 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-extrabold md:text-4xl">Ready to Join ICA and Build Your Future?</h2>
            <p className="mt-3 text-sm text-white/84 md:text-base">
              Admissions are open for current sessions. Start your certification journey or launch your franchise centre with ICA’s guidance framework.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25">
              Apply for Admission <ArrowRight size={16} />
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10">
              Connect for Franchise <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [typedText, setTypedText] = useState('')
  const [typedIndex, setTypedIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const typingLines = useMemo(
    () => [
      'Enroll Today, Empower Tomorrow.',
      'Become a Part of Our Vision for the Future.',
      'Unleashing Potential, Igniting Passion.',
      'Your Success Starts Here.',
      'Together, We Learn, Grow, and Succeed.',
    ],
    [],
  )

  useEffect(() => {
    const line = typingLines[typedIndex]
    let i = 0
    setTypedText('')

    const interval = window.setInterval(() => {
      i += 1
      setTypedText(line.slice(0, i))
      if (i === line.length) {
        window.clearInterval(interval)
        window.setTimeout(() => {
          setTypedIndex((prev) => (prev + 1) % typingLines.length)
        }, 1200)
      }
    }, 36)

    return () => window.clearInterval(interval)
  }, [typedIndex, typingLines])

  useEffect(() => {
    gsap.fromTo(
      '.reveal-item',
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power2.out',
      },
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0f1e] text-white">
      <style>{`
        :root {
          --deep-space: #0a0f1e;
          --electric-cyan: #22d3ee;
          --neon-violet: #8b5cf6;
          --frost-white: rgba(255, 255, 255, 0.08);
        }

        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
          background:
            radial-gradient(circle at 10% 10%, rgba(34, 211, 238, 0.2), transparent 34%),
            radial-gradient(circle at 88% 15%, rgba(139, 92, 246, 0.18), transparent 32%),
            radial-gradient(circle at 50% 90%, rgba(56, 189, 248, 0.12), transparent 34%),
            #050914;
          color: #f8fafc;
        }

        .mesh-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at 50% 35%, black 40%, transparent 85%);
          pointer-events: none;
        }

        .glass-shell {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 18px 40px rgba(8, 15, 38, 0.55);
        }

        .hero-halo {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 9999px;
          filter: blur(95px);
          opacity: 0.45;
          pointer-events: none;
        }

        .halo-cyan {
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.95), rgba(34, 211, 238, 0));
          animation: float-halo 10s ease-in-out infinite;
        }

        .halo-violet {
          right: -120px;
          bottom: -120px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.95), rgba(139, 92, 246, 0));
          animation: float-halo 12s ease-in-out infinite reverse;
        }

        .hero-canvas {
          filter: drop-shadow(0 0 30px rgba(34, 211, 238, 0.25));
        }

        .ticker-wrap {
          overflow: hidden;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(6, 10, 22, 0.68);
        }

        .ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: ticker-scroll 40s linear infinite;
          min-width: 200%;
          gap: 2.25rem;
          padding: 0.6rem 0;
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(165, 243, 252, 0.95);
        }

        .typing-caret {
          display: inline-block;
          margin-left: 0.25rem;
          animation: caret-blink 1s step-end infinite;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-auto-rows: minmax(180px, auto);
          }

          .course-card {
            grid-column: span 2 / span 2;
          }

          .course-wide {
            grid-column: span 3 / span 3;
          }

          .course-lg {
            grid-row: span 2 / span 2;
          }
        }

        .course-card {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1.4rem;
          padding: 1.15rem;
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
          position: relative;
          overflow: hidden;
        }

        .course-card::before {
          content: '';
          position: absolute;
          inset: -120%;
          background: conic-gradient(from 40deg, rgba(34, 211, 238, 0.15), rgba(139, 92, 246, 0.16), transparent, transparent);
          transform: rotate(0deg);
          transition: transform 0.8s ease;
          pointer-events: none;
        }

        .course-card:hover {
          transform: translateY(-4px);
          border-color: rgba(34, 211, 238, 0.6);
          box-shadow: 0 0 22px rgba(34, 211, 238, 0.2);
        }

        .course-card:hover::before {
          transform: rotate(180deg);
        }

        .course-action {
          position: relative;
          z-index: 1;
          transition: all 0.25s ease;
        }

        .course-card:hover .course-action {
          border-color: rgba(34, 211, 238, 0.7);
          color: rgba(165, 243, 252, 1);
          background: rgba(34, 211, 238, 0.12);
        }

        .cyber-input {
          display: block;
          border: 1px solid rgba(34, 211, 238, 0.4);
          border-radius: 0.9rem;
          padding: 0.72rem 0.9rem;
          background: linear-gradient(135deg, rgba(8, 18, 42, 0.72), rgba(13, 20, 44, 0.72));
          box-shadow:
            inset 0 0 0 1px rgba(34, 211, 238, 0.1),
            0 0 16px rgba(34, 211, 238, 0.08);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .cyber-input:focus-within {
          border-color: rgba(34, 211, 238, 0.85);
          box-shadow:
            inset 0 0 0 1px rgba(34, 211, 238, 0.35),
            0 0 20px rgba(34, 211, 238, 0.25);
        }

        .profile-orb {
          background:
            radial-gradient(circle at 30% 26%, rgba(165, 243, 252, 0.95), rgba(34, 211, 238, 0.34) 32%, rgba(7, 19, 40, 1) 75%),
            linear-gradient(130deg, rgba(34, 211, 238, 0.28), rgba(139, 92, 246, 0.24));
          box-shadow: inset 0 0 34px rgba(34, 211, 238, 0.2), 0 0 24px rgba(34, 211, 238, 0.26);
          animation: float-orb 7.2s ease-in-out infinite;
        }

        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes caret-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes float-halo {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, 22px, 0) scale(1.04); }
        }

        @keyframes float-orb {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }

        .news-card {
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .news-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(34, 211, 238, 0.06), rgba(139, 92, 246, 0.04));
          pointer-events: none;
        }

        .news-card:hover {
          transform: translateY(-3px);
          border-color: rgba(34, 211, 238, 0.48);
          box-shadow: 0 0 22px rgba(34, 211, 238, 0.16);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 0.9rem;
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
            grid-auto-rows: 180px;
          }
        }

        .gallery-card {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.16);
          min-height: 220px;
          background: rgba(255, 255, 255, 0.04);
        }

        @media (min-width: 768px) {
          .gallery-card {
            grid-column: span 4 / span 4;
            min-height: auto;
          }

          .gallery-tall {
            grid-row: span 2 / span 2;
          }
        }

        .gallery-card img {
          transition: transform 0.6s ease;
        }

        .gallery-card:hover img {
          transform: scale(1.06);
        }

        .gallery-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0.8rem;
          background: linear-gradient(to top, rgba(2, 8, 23, 0.9), rgba(2, 8, 23, 0.05));
        }

        .franchise-track {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 0.9rem;
        }

        @media (min-width: 768px) {
          .franchise-track {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
        }

        .fr-step {
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.06);
          padding: 0.9rem;
          min-height: 168px;
        }

        .fr-step-top {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .fr-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          border: 1px solid rgba(34, 211, 238, 0.5);
          background: rgba(34, 211, 238, 0.16);
          color: rgba(207, 250, 254, 1);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .success-card {
          transition: transform 0.24s ease, border-color 0.24s ease;
        }

        .success-card:hover {
          transform: translateY(-3px);
          border-color: rgba(16, 185, 129, 0.5);
        }

        .faq-item {
          transition: border-color 0.22s ease, box-shadow 0.22s ease;
        }

        .faq-item:hover {
          border-color: rgba(34, 211, 238, 0.5);
          box-shadow: 0 0 18px rgba(34, 211, 238, 0.14);
        }

        .cta-panel {
          background:
            radial-gradient(circle at 10% 20%, rgba(34, 211, 238, 0.18), transparent 30%),
            radial-gradient(circle at 90% 90%, rgba(139, 92, 246, 0.16), transparent 35%),
            rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 20px 50px rgba(8, 15, 38, 0.5);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
        }

        .franchise-live-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 0.75rem;
        }

        @media (min-width: 768px) {
          .franchise-live-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (min-width: 1200px) {
          .franchise-live-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        .franchise-live-card {
          border-radius: 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 0.75rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .franchise-live-card:hover {
          transform: translateY(-3px) rotateX(2deg);
          border-color: rgba(34, 211, 238, 0.58);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.17);
        }
      `}</style>

      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-full border border-cyan-300/45 bg-cyan-300/15 px-3 py-1.5 text-xs font-semibold text-cyan-100">Admin Login</button>
            <button type="button" className="rounded-full border border-violet-300/45 bg-violet-300/15 px-3 py-1.5 text-xs font-semibold text-violet-100">Centre Login</button>
          </div>
          <RealtimeClock />
        </div>

        <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 pb-3 md:flex">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
            <Binary size={13} /> 01010101
          </div>
          <nav className="flex items-center gap-2 text-sm text-white/90">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="rounded-lg border border-transparent px-2 py-1 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="pt-[110px] md:pt-[120px]">
        <section className="relative isolate overflow-hidden px-4 pb-16 pt-16 md:pb-20 md:pt-20">
          <HeroThreeMatrix />
          <div className="mesh-overlay" />
          <span className="hero-halo halo-cyan" />
          <span className="hero-halo halo-violet" />

          <div className="reveal-item relative mx-auto max-w-7xl" style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}>
            <div className="max-w-3xl rounded-[2rem] border border-white/15 bg-white/8 p-6 backdrop-blur-sm md:p-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
                <Cpu size={14} />
                Improven Computer Academy
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Enroll Today, Empower Tomorrow.</h1>
              <p className="mt-4 min-h-[1.7rem] text-base text-cyan-100 md:text-xl">
                {typedText}
                <span className="typing-caret">|</span>
              </p>
              <p className="mt-4 text-sm text-white/80 md:text-base">
                Leading future-focused digital education in Patna with certifications in DCA, ADCA, Tally, Typing,
                Programming, Networking, and Teacher Training.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25">
                  Start Admission
                  <ArrowRight size={16} />
                </button>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10">
                  Franchise Enquiry
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="ticker-wrap mt-8">
              <div className="ticker-track">
                {Array.from({ length: 3 }).map((_, row) => (
                  <div key={row} className="inline-flex items-center gap-9 px-4">
                    {TICKER_TEXT.map((item) => (
                      <span key={`${row}-${item}`} className="ticker-item">
                        <Sparkles size={12} className="text-violet-200" />
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DirectorsSuite />

        <section className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 md:grid-cols-2">
          <div className="reveal-item">
            <AnimatedCounter end={18000} suffix="+" label="Total Registered Students" icon={GraduationCap} theme="cyan" />
          </div>
          <div className="reveal-item">
            <AnimatedCounter end={30} suffix="+" label="Total Registered Centres" icon={Users} theme="violet" />
          </div>
        </section>

        <CourseBento />
        <NewsPulseSection />
        <GalleryShowcase />
        <FranchiseLaunchPad />
        <LiveFranchiseGrid />
        <SuccessWall />
        <WhyChooseICA />
        <FAQSection />
        <CTAFinal />

        <section className="mx-auto mt-12 max-w-7xl px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="glass-shell reveal-item rounded-2xl border border-cyan-300/30 p-5">
              <h3 className="mb-2 inline-flex items-center gap-2 text-lg font-bold text-cyan-100"><ShieldCheck size={18} /> Verification Links</h3>
              <p className="text-sm text-white/80">Registration Verification, I-Card Verification, Marksheet Verification, Certificate Verification, Typing Certificate.</p>
            </article>
            <article className="glass-shell reveal-item rounded-2xl border border-violet-300/30 p-5">
              <h3 className="mb-2 inline-flex items-center gap-2 text-lg font-bold text-violet-100"><GalleryHorizontal size={18} /> Our Franchises</h3>
              <p className="text-sm text-white/80">Certificate Distribution and Events with expansion-ready support for regional centres and entrepreneurship pathways.</p>
            </article>
            <article className="glass-shell reveal-item rounded-2xl border border-white/20 p-5">
              <h3 className="mb-2 inline-flex items-center gap-2 text-lg font-bold"><CheckCircle2 size={18} className="text-emerald-300" /> Certifications</h3>
              <p className="text-sm text-white/80">ISO Certificate · Trade Mark · MSME Govt of India · PAN Card · Central Vigilance Commission references.</p>
            </article>
          </div>
        </section>

        <VerificationPortal />

        <section id="contact" className="mx-auto mt-8 max-w-7xl px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="glass-shell rounded-2xl border border-white/10 p-5">
              <h3 className="mb-3 inline-flex items-center gap-2 font-bold text-cyan-100"><MapPin size={16} /> Office Address</h3>
              <p className="text-sm text-white/82">IMPROVEN COMPUTER ACADEMY PVT LTD, Near RLSY College, Dharhara Paliganj, Patna - 801110, Bihar</p>
            </article>
            <article className="glass-shell rounded-2xl border border-white/10 p-5">
              <h3 className="mb-3 inline-flex items-center gap-2 font-bold text-violet-100"><Phone size={16} /> Call Us</h3>
              <p className="text-sm text-white/82">Nothing Here</p>
              <p className="text-sm text-white/82">Nothing Here</p>
            </article>
            <article className="glass-shell rounded-2xl border border-white/10 p-5">
              <h3 className="mb-3 inline-flex items-center gap-2 font-bold text-cyan-100"><Mail size={16} /> Mail Us</h3>
              <p className="text-sm text-white/82">info@improvencomputer.in</p>
              <p className="text-sm text-white/82">improvencomputer801110@gmail.com</p>
            </article>
          </div>
        </section>
      </main>

      <FooterMatrix />
    </div>
  )
}
