// Extra topics that the hierarchy graph doesn't cover directly but that
// readers often ask about. Descriptions are original paraphrased summaries.
// These get merged into the searchable corpus used by the Ohmm bot.

const faqs = [
  {
    id: "faq-trimurti",
    name: "Trimūrti",
    sanskrit: "Trimūrti",
    summary:
      "The classical triad of Brahmā, Viṣṇu, and Śiva representing the cosmic functions of creation, preservation, and dissolution.",
    description:
      "The Trimūrti is a theological framework in which the ultimate reality is expressed through three personal deities. Brahmā creates, Viṣṇu sustains and rescues the order of the world, and Śiva dissolves so that creation can begin again. Different traditions elevate one of the three as supreme — Vaiṣṇavas treat Viṣṇu as the ultimate, Śaivas treat Śiva that way, and Śāktas give that role to the Goddess, who is sometimes treated as the power behind all three."
  },
  {
    id: "faq-avatars",
    name: "Avatars of Viṣṇu",
    sanskrit: "Daśāvatāra",
    summary:
      "The classical ten descents of Viṣṇu into the world, each undertaken to restore dharma when the world is out of balance.",
    description:
      "The avatar doctrine holds that God periodically enters the world in a particular form to protect the good, defeat forces that threaten order, and re-establish right living. The ten traditional descents — Matsya, Kūrma, Varāha, Narasiṃha, Vāmana, Paraśurāma, Rāma, Kṛṣṇa, Buddha, and Kalki — span fish, tortoise, boar, man-lion, dwarf, warrior-brahmin, prince, cowherd-teacher, sage, and future judge. Rāma and Kṛṣṇa in particular became the focus of vast devotional literatures."
  },
  {
    id: "faq-gunas",
    name: "Three Guṇas",
    sanskrit: "Guṇa",
    summary:
      "Three fundamental qualities or strands of matter — sattva, rajas, and tamas — whose mixture accounts for the character of every material thing.",
    description:
      "Sāṃkhya analyzes prakṛti, the material side of reality, as a constant interplay of three guṇas. Sattva is clarity, lightness, and intelligibility; rajas is motion, restlessness, and drive; tamas is inertia, heaviness, and obscurity. Every object, every food, every mood is a mixture of the three in some proportion. The Gītā applies the scheme to describe kinds of action, kinds of knowledge, and even kinds of personality."
  },
  {
    id: "faq-ashramas",
    name: "Four Āśramas",
    sanskrit: "Āśrama",
    summary:
      "The four classical stages of life: student, householder, forest-dweller, and renunciant.",
    description:
      "The āśrama scheme imagines an ideal life as four sequential stages. The student (brahmacārin) learns from a teacher. The householder (gṛhastha) earns, marries, raises a family, and supports the other three stages through their labor. The forest-dweller (vānaprastha) withdraws gradually from social roles. The renunciant (saṃnyāsin) lets go of worldly ties entirely in pursuit of liberation. In practice the scheme is an idealization more than a description, but it powerfully structures how dharmic texts talk about time and obligation."
  },
  {
    id: "faq-yogas",
    name: "Three Paths of the Gītā",
    sanskrit: "Karma, Jñāna, Bhakti",
    summary:
      "The Bhagavad Gītā's three interwoven paths to liberation: selfless action, contemplative knowledge, and loving devotion.",
    description:
      "Karma yoga is action undertaken without clinging to its fruits — duty performed as offering rather than as a means to personal gain. Jñāna yoga is the discernment of the true self through study and reflection, loosening the grip of false identification. Bhakti yoga is a focused, affectionate relationship with a chosen form of the divine, in which devotion itself transforms the devotee. Most commentators read the Gītā as recommending all three as mutually reinforcing rather than as competing alternatives."
  },
  {
    id: "faq-shankara",
    name: "Ādi Śaṅkara",
    sanskrit: "Śaṅkarācārya",
    summary:
      "The eighth-century philosopher who systematized Advaita Vedānta and founded monastic institutions across India.",
    description:
      "Śaṅkara is remembered as the architect of rigorous Advaita. In a short life — traditional accounts say thirty-two years — he wrote influential commentaries on the Upaniṣads, the Brahma Sūtras, and the Gītā, and a number of shorter works aimed at teaching non-dualism step by step. He is also credited with founding four maṭhas (monasteries) at the cardinal directions of the subcontinent, institutions whose successor lineages still carry his name."
  },
  {
    id: "faq-ramanuja",
    name: "Rāmānuja",
    sanskrit: "Rāmānujācārya",
    summary:
      "The eleventh–twelfth century teacher who articulated Viśiṣṭādvaita and gave theistic Vedānta a rigorous philosophical footing.",
    description:
      "Rāmānuja is the decisive figure for Śrī Vaiṣṇavism. Against strict non-dualism he argued that souls and world are real and form, in a precise sense, the body of God. His commentaries on the Gītā and Brahma Sūtras argue that the Upaniṣads, read carefully, support a personal theism in which loving surrender to Viṣṇu-Nārāyaṇa is the path to liberation. He was also a notable reformer, opening temple worship and teaching to communities that had been excluded from it."
  },
  {
    id: "faq-madhva",
    name: "Madhva",
    sanskrit: "Madhvācārya",
    summary:
      "The thirteenth-century teacher who founded Dvaita Vedānta, defending a strict plurality of God, souls, and matter.",
    description:
      "Madhva pushed hard against any reading of the Upaniṣads that collapsed the distinction between the self and God. In his system God (Viṣṇu) is supreme and fully different from both souls and matter; souls are eternally graded; and the world is real. Liberation is not merger but stable, differentiated proximity to God through grace. Madhva founded the Udupi lineage, which still administers a famous Kṛṣṇa temple and related institutions."
  },
  {
    id: "faq-buddha",
    name: "Siddhārtha Gautama (the Buddha)",
    sanskrit: "Buddha",
    summary:
      "The teacher, born in the fifth or sixth century BCE, whose diagnosis of suffering and path to its cessation launched Buddhism.",
    description:
      "Traditional accounts describe Siddhārtha as a sheltered prince who leaves his palace, confronts old age, sickness, and death, and undertakes a long search for a path out of suffering. He rejects extreme asceticism in favor of a 'middle way' of ethical conduct, meditation, and discernment. His teaching — the four noble truths and the noble eightfold path — becomes the seed of all later Buddhist schools."
  },
  {
    id: "faq-vivekananda",
    name: "Swami Vivekananda",
    sanskrit: "Vivekānanda",
    summary:
      "A late-nineteenth-century monk and reformer who presented Vedānta to a global audience and helped shape modern Hindu self-understanding.",
    description:
      "Vivekananda, a disciple of the Bengali mystic Ramakrishna, became famous for his speeches at the 1893 Parliament of the World's Religions in Chicago. He argued for a Hinduism centered on the realization of a divine self in every person and linked that metaphysical vision to a program of social service and education. His writings and the Ramakrishna Mission he founded remain major influences on modern Indian religious life."
  },
  {
    id: "faq-nirvana-moksha",
    name: "Nirvāṇa vs. Mokṣa",
    sanskrit: "Nirvāṇa / Mokṣa",
    summary:
      "Two overlapping but distinct ways of naming liberation — one from Buddhist, one from Hindu vocabularies.",
    description:
      "Both terms describe the end of bondage to the cycle of birth and death, but they carry different commitments. Mokṣa, in most Hindu schools, is the realization of a self that was always free — either as Brahman, as pure consciousness distinct from matter, or as a soul in loving union with God. Nirvāṇa, in Buddhist usage, is the extinguishing of the fires of craving, hatred, and delusion — and the early Buddhist tradition is careful not to assert a permanent self doing the liberating. The difference is small in practical emphasis but large in metaphysics."
  },
  {
    id: "faq-karma-yoga",
    name: "Karma Yoga",
    sanskrit: "Karma-yoga",
    summary:
      "The discipline of action performed as duty, without clinging to its outcomes.",
    description:
      "Karma yoga, taught most memorably in the Gītā, reframes everyday work as spiritual practice. The problem is not action itself but attachment to the fruits of action. When duty is done wholeheartedly as offering, without grasping at success or fleeing from failure, the residue that normally binds a person to saṃsāra does not form. In later devotional literature this is often folded together with bhakti so that action is offered to a chosen form of God."
  },
  {
    id: "faq-bhakti-yoga",
    name: "Bhakti Yoga",
    sanskrit: "Bhakti-yoga",
    summary:
      "The path of loving devotion to a personal deity as the central spiritual discipline.",
    description:
      "Bhakti yoga is the approach in which relationship itself — a sustained, emotionally warm love directed at a chosen form of God — is the transformative engine. The Gītā frames bhakti as accessible to anyone, regardless of learning or social position. The medieval bhakti movements across north and south India produced an enormous body of devotional poetry in regional languages and decisively shaped popular Hindu religious life."
  },
  {
    id: "faq-jnana-yoga",
    name: "Jñāna Yoga",
    sanskrit: "Jñāna-yoga",
    summary:
      "The path of discerning knowledge in which philosophical insight is the engine of liberation.",
    description:
      "Jñāna yoga works by removing misidentification. Through study of texts under a teacher, sustained reflection, and meditative absorption on the nature of the self, the practitioner loosens their grip on false layers of identity — body, emotion, social role — until what remains is the witness that the Upaniṣads call ātman. In Advaita this witness is recognized as non-different from Brahman."
  },
  {
    id: "faq-bhakti-movement",
    name: "The Bhakti Movement",
    sanskrit: "Bhakti Movement",
    summary:
      "A wave of devotional religious poetry and practice that reshaped Hinduism across India from roughly the seventh to the seventeenth centuries.",
    description:
      "Beginning in the Tamil south and spreading north over many centuries, the bhakti movement produced poets and saints who sang in regional languages about direct, intimate love of a personal God. Figures like Āṇṭāḷ, Basava, Mirabai, Kabir, Tulsidas, and Caitanya reworked Hindu practice around accessible devotion rather than learned ritual, often challenging rigid social hierarchies in the process. The movement decisively shaped the Vaiṣṇava and Śaiva sub-schools that still dominate popular Hindu life."
  },
  {
    id: "faq-trimurti-vs-trinity",
    name: "Hinduism and monotheism",
    sanskrit: "Ekatva, Bahutva",
    summary:
      "A sketch of how Hindu traditions relate the many gods to a single ultimate.",
    description:
      "Hinduism is often described as polytheistic, but that's a partial reading. Most classical schools treat the many deities as faces or powers of a single ultimate reality. Advaita identifies that ultimate with an impersonal Brahman. Viśiṣṭādvaita identifies it with a personal God whose body is all souls and world. Śākta traditions identify it with the Goddess. The many gods are then not competitors but coordinated expressions of the one, addressable by anyone who finds a particular form congenial."
  },
  {
    id: "faq-puranas",
    name: "Purāṇas",
    sanskrit: "Purāṇa",
    summary:
      "A genre of expansive narrative scripture that tells the mythic history of gods, worlds, and dynasties.",
    description:
      "The Purāṇas are long compendia composed and edited over many centuries. They tell origin stories, recount the deeds of avatars, lay out cosmology and geography, and set out devotional frameworks for particular deities. The eighteen 'great' Purāṇas and many 'minor' ones are the main popular source for the stories most Hindus grow up with, and they shape temple worship and festival calendars across India."
  },
  {
    id: "faq-mahabharata",
    name: "Mahābhārata",
    sanskrit: "Mahābhārata",
    summary:
      "The great Sanskrit epic centered on a dynastic war between the Pāṇḍavas and Kauravas, containing the Bhagavad Gītā.",
    description:
      "The Mahābhārata is an immense composite work that frames a catastrophic family war as the occasion for extended reflection on duty, kinship, and divine agency. It contains independent philosophical texts — most famously the Bhagavad Gītā — and long discourses on dharma, law, and governance. Its sheer narrative range has made it a continually reinterpreted touchstone of Indian moral and political thought."
  },
  {
    id: "faq-ramayana",
    name: "Rāmāyaṇa",
    sanskrit: "Rāmāyaṇa",
    summary:
      "The Sanskrit epic of Prince Rāma, whose virtues and exile became a template for ideal human and political conduct.",
    description:
      "Ascribed to the sage Vālmīki, the Rāmāyaṇa tells the story of Rāma's exile, the abduction of Sītā by the demon-king Rāvaṇa, and the war to recover her. Over centuries the story was retold in many Indian languages — most influentially by Tulsidas in Avadhī — and carried across South and Southeast Asia. Rāma's conduct is often held up as a standard for ideal kingship, marriage, and loyalty, though modern readers also read the epic critically."
  },
  {
    id: "faq-chakras",
    name: "Chakras",
    sanskrit: "Cakra",
    summary:
      "Energy centers arranged along a subtle channel, used in tantric and haṭha-yoga maps of the body.",
    description:
      "The chakra schema, most familiar from tantric and later haṭha-yoga literature, describes a subtle body in which a central channel runs along the spine and intersects with focal points at specific locations — typically seven in the most popular version, from the base of the spine to the crown of the head. Practices using visualization, mantra, breath, and posture aim to awaken and guide subtle energy through these points, with effects described in both psychological and metaphysical terms."
  },
  {
    id: "faq-maya",
    name: "Māyā",
    sanskrit: "Māyā",
    summary:
      "The principle by which the one real is experienced as the many — often translated as illusion, but more accurately a kind of constructive appearance.",
    description:
      "In Advaita, māyā is what makes a single reality appear as a diverse world of separate selves and objects. It is not mere illusion in the sense of hallucination; it is a power of appearing that is beginningless, real enough to structure ordinary experience, and yet cancelled in the knowledge that recognizes Brahman alone as ultimately real. Other schools use the term more narrowly or reject it as a metaphysical posit."
  },
  {
    id: "faq-om",
    name: "Om (Auṃ)",
    sanskrit: "Auṃ / Oṃ",
    summary:
      "The primordial sound-syllable that both represents and, in some accounts, enacts the ultimate reality.",
    description:
      "Om is the most loaded single syllable in Indian religious practice. The Upaniṣads read it as containing the whole of reality in compressed form — its three phonemes marking waking, dreaming, and deep sleep, with silence beyond the syllable pointing to a fourth, pure awareness. It opens mantras, frames meditations, and marks the beginning and end of recited texts across nearly every Hindu, Buddhist, and Jain tradition."
  }
];

export default faqs;
