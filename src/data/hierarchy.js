// Hindu Philosophy hierarchy.
// All descriptions are paraphrased originals — no passages are copied from
// any reference source. They are written as short, plain-English summaries
// suitable for a general reader exploring the tree.

const hierarchy = {
  id: "root",
  name: "Hindu Philosophy",
  sanskrit: "Darśana",
  summary:
    "A family of systematic philosophical traditions that grew out of the Vedic corpus on the Indian subcontinent. The Sanskrit word darśana literally means a viewpoint or a way of seeing, and each school represents a distinct lens on reality, knowledge, and liberation.",
  description:
    "Hindu philosophy is not a single doctrine but a long, argumentative conversation among schools that developed over more than two millennia. They share a cluster of guiding questions — what is ultimately real, how we come to know anything reliably, and how a person can be free from suffering — while disagreeing sharply on the answers. The standard classification divides them by their stance toward the Vedas: six orthodox schools accept Vedic authority, while several heterodox systems reject it. Both sides influenced one another through centuries of debate.",
  children: [
    {
      id: "texts",
      name: "Foundational Texts",
      sanskrit: "Śruti & Smṛti",
      summary:
        "The shared scriptural base that the orthodox schools treat as revealed and that the heterodox schools interact with critically.",
      description:
        "Before there are schools, there is a library. The foundational texts of Hindu philosophy were composed over many centuries and layered on top of one another. Hymns and ritual manuals came first, then speculative dialogues, then terse aphoristic sūtras, and finally long systematic commentaries. Different traditions privilege different parts of this library, which is one reason the schools diverge so much.",
      children: [
        {
          id: "vedas",
          name: "The Vedas",
          sanskrit: "Veda",
          summary:
            "Four ancient collections of hymns, ritual formulas, and speculative passages that form the oldest layer of Indian religious literature.",
          description:
            "The four Vedas — Ṛg, Yajur, Sāma, and Atharva — are a composite body of hymns, chants, sacrificial instructions, and philosophical fragments. The orthodox schools treat them as authorless and revealed (śruti), which is why defending or denying their authority became the pivot around which classical Indian philosophy was organized."
        },
        {
          id: "upanishads",
          name: "Upaniṣads",
          sanskrit: "Upaniṣad",
          summary:
            "Late-Vedic dialogues that turn attention from ritual to the nature of the self and ultimate reality.",
          description:
            "The Upaniṣads are the speculative, dialogical culmination of the Vedic corpus. They pose the questions that Vedānta will spend a thousand years working on: what is Brahman, the ground of everything, and what is ātman, the self that is somehow inside experience? Their cryptic metaphors and thought experiments seeded most of the later metaphysics."
        },
        {
          id: "gita",
          name: "Bhagavad Gītā",
          sanskrit: "Bhagavad-Gītā",
          summary:
            "A 700-verse dialogue set on a battlefield in which Kṛṣṇa teaches Arjuna three interwoven paths to freedom.",
          description:
            "Embedded in the epic Mahābhārata, the Gītā synthesizes paths of action, knowledge, and devotion into a single practical teaching addressed to someone paralyzed by doubt. Almost every later Vedānta teacher wrote a commentary on it, which is one reason it ends up quoted on every side of every internal Vedāntic argument."
        },
        {
          id: "sutras",
          name: "Sūtras & Commentaries",
          sanskrit: "Sūtra, Bhāṣya",
          summary:
            "Compact aphoristic texts that gave each school its canonical formulation, along with the elaborate commentaries that interpret them.",
          description:
            "Indian philosophical schools were typically crystallized by a set of sūtras — extremely terse aphorisms that presuppose a teacher to unpack them. The Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Mīmāṃsā, and Brahma Sūtras each anchor one of the orthodox traditions. The real philosophical action often happens in the commentaries (bhāṣya) and sub-commentaries written around them."
        }
      ]
    },
    {
      id: "astika",
      name: "Orthodox Schools",
      sanskrit: "Āstika",
      summary:
        "The six systems that accept the authority of the Vedas and are traditionally grouped in three pairs.",
      description:
        "Āstika schools are the ones that treat the Vedas as a valid source of knowledge. They are conventionally listed as six: Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Mīmāṃsā, and Vedānta. Tradition pairs them — Nyāya with Vaiśeṣika, Sāṃkhya with Yoga, Mīmāṃsā with Vedānta — because the members of each pair largely share metaphysical assumptions while specializing in different problems.",
      children: [
        {
          id: "nyaya",
          name: "Nyāya",
          sanskrit: "Nyāya",
          summary:
            "A school of logic and epistemology focused on what counts as a valid way of coming to know something.",
          description:
            "Associated with the sage Gautama (Akṣapāda), Nyāya is the most rigorously logical of the orthodox schools. It identifies four valid means of knowledge — perception, inference, comparison, and testimony — and works out careful rules for each. Its practical payoff is liberation through the removal of false cognition: if you stop misunderstanding the world, you stop generating the attachments that keep you trapped in it."
        },
        {
          id: "vaisesika",
          name: "Vaiśeṣika",
          sanskrit: "Vaiśeṣika",
          summary:
            "A pluralist atomist metaphysics that classifies everything in reality into a small number of categories.",
          description:
            "Attributed to Kaṇāda, Vaiśeṣika pairs with Nyāya and supplies a picture of what there is. Reality falls into categories such as substance, quality, action, universal, particularity, and inherence. The physical world is built from eternal atoms (aṇu) whose combinations are governed by both natural and moral law. Its project is a kind of early systematic ontology, concerned with distinguishing the sorts of things that can exist."
        },
        {
          id: "samkhya",
          name: "Sāṃkhya",
          sanskrit: "Sāṃkhya",
          summary:
            "An ancient dualism that separates pure consciousness from primordial matter and explains experience as an entanglement between them.",
          description:
            "Sāṃkhya, associated with the sage Kapila, is one of the oldest systematic schools. It draws a hard line between puruṣa, the witnessing consciousness, and prakṛti, unconscious matter composed of three fundamental strands (guṇas) called sattva, rajas, and tamas. Ordinary experience happens when consciousness mistakenly identifies itself with the workings of matter; liberation is the clear discernment that the two are not the same."
        },
        {
          id: "yoga",
          name: "Yoga",
          sanskrit: "Yoga",
          summary:
            "A disciplined path of ethical, bodily, and mental training built on Sāṃkhya metaphysics.",
          description:
            "Codified in Patañjali's Yoga Sūtras, this school accepts the basic metaphysical picture of Sāṃkhya but focuses on a practical method. Its eight limbs move from ethical restraints and observances through posture, breath control, sensory withdrawal, concentration, and meditation, toward absorption (samādhi). Where Sāṃkhya analyzes bondage, Yoga offers a step-by-step training in dis-identification."
        },
        {
          id: "mimamsa",
          name: "Mīmāṃsā",
          sanskrit: "Pūrva-Mīmāṃsā",
          summary:
            "The school devoted to interpreting Vedic ritual and defending the binding force of dharmic action.",
          description:
            "Founded by Jaimini, Mīmāṃsā is almost entirely concerned with the correct interpretation of Vedic injunctions. It holds that the Vedas are eternal and uncreated and that ritual action, done properly, produces an unseen effect (apūrva) that later bears fruit. Its epistemology is insistently realist: perceptions and sentences are taken to be trustworthy until specifically defeated, rather than the other way around."
        },
        {
          id: "vedanta",
          name: "Vedānta",
          sanskrit: "Uttara-Mīmāṃsā",
          summary:
            "The philosophical interpretation of the Upaniṣads — a family of schools that disagree over how the self relates to the ultimate.",
          description:
            "Vedānta, literally 'the end of the Vedas,' takes the Upaniṣads, the Brahma Sūtras, and the Gītā as its core canon. It is less a single doctrine than a conversation about one question: how does the individual self (ātman) stand in relation to ultimate reality (Brahman)? Different teachers answered that question in strikingly different ways, and each answer became a sub-school.",
          children: [
            {
              id: "advaita",
              name: "Advaita Vedānta",
              sanskrit: "Advaita",
              summary:
                "A strict non-dualism: only Brahman is ultimately real, and all plurality is misperception.",
              description:
                "Systematized by Śaṅkara in roughly the 8th century, Advaita argues that Brahman is the sole reality. The diverse world we seem to experience is māyā — not sheer illusion, but a beginningless superimposition whose apparent reality evaporates in correct knowledge. The self is not similar to Brahman; it is Brahman, and liberation is recognizing this."
            },
            {
              id: "vishishtadvaita",
              name: "Viśiṣṭādvaita",
              sanskrit: "Viśiṣṭādvaita",
              summary:
                "Qualified non-dualism: souls and world are real and form the body of a personal God.",
              description:
                "Articulated by Rāmānuja in the 11th–12th centuries, this school agrees that reality is ultimately one but insists that the one has internal structure. Individual souls and the material world are real and dependent attributes of Brahman, understood as the personal deity. Liberation is eternal loving communion with God, not dissolution into an undifferentiated absolute."
            },
            {
              id: "dvaita",
              name: "Dvaita",
              sanskrit: "Dvaita",
              summary:
                "A strict dualism in which God, souls, and matter are eternally distinct.",
              description:
                "Madhva in the 13th century pushed back hard against non-dualist readings of the Upaniṣads. For him, God (Viṣṇu) is supreme and fully other than both souls and matter. Souls are graded by capacity and depend entirely on divine grace. Liberation is a stable proximity to God, never a merger with God."
            },
            {
              id: "dvaitadvaita",
              name: "Dvaitādvaita",
              sanskrit: "Bhedābheda",
              summary:
                "A dualistic non-dualism in which souls and world are both different from and non-different from Brahman.",
              description:
                "Nimbārka's school treats the relationship between the self and Brahman as genuinely twofold: different, because the individual is not the whole; non-different, because the individual has no being apart from the whole. A frequent analogy is a wave and the ocean. Devotion to Kṛṣṇa and Rādhā is central in practice."
            },
            {
              id: "shuddhadvaita",
              name: "Śuddhādvaita",
              sanskrit: "Śuddhādvaita",
              summary:
                "Pure non-dualism: the world is a real expression of Kṛṣṇa rather than an illusory appearance.",
              description:
                "Vallabha in the 15th–16th centuries rejected the Advaitic notion that the world is unreal. In his view everything is a real manifestation of Kṛṣṇa. Liberation is attained through the path of grace (puṣṭi-mārga), in which the devotee depends wholly on divine favor rather than on their own effort or knowledge."
            },
            {
              id: "acintya",
              name: "Acintya Bhedābheda",
              sanskrit: "Acintya-bhedābheda",
              summary:
                "An 'inconceivable' simultaneous difference and non-difference between souls and the ultimate.",
              description:
                "Associated with Caitanya in the 16th century and the Gauḍīya Vaiṣṇava tradition, this view holds that the relation between souls and Brahman is at once one of difference and non-difference, and that this relation is inconceivable — acintya — to ordinary reason. Devotion (bhakti) to Kṛṣṇa is the operative path."
            }
          ]
        }
      ]
    },
    {
      id: "nastika",
      name: "Heterodox Schools",
      sanskrit: "Nāstika",
      summary:
        "Indian philosophical systems that do not grant the Vedas ultimate authority, developed in constant dialogue with the orthodox side.",
      description:
        "The heterodox schools are grouped together more by what they reject than by what they share. Cārvāka, Jainism, and Buddhism each deny that the Vedas are the last word, but they proceed from very different assumptions about souls, persons, and the physical world. They were treated as serious philosophical interlocutors by the orthodox schools for centuries, and their arguments shape the classical Indian debates as much as any āstika text.",
      children: [
        {
          id: "carvaka",
          name: "Cārvāka",
          sanskrit: "Lokāyata",
          summary:
            "A materialist, empiricist tradition that rejects the soul, karma, and the afterlife.",
          description:
            "Cārvāka, also called Lokāyata, is the odd one out of classical Indian thought: a philosophy of the world you can see, hear, and touch. Its adherents accepted perception as the only reliable source of knowledge and were skeptical about inference when it reached beyond experience. They rejected a separate soul, denied rebirth, and placed the human good in a sensible pursuit of worldly pleasure. Most of what survives of them is preserved through the refutations of their critics."
        },
        {
          id: "jain",
          name: "Jainism",
          sanskrit: "Jaina-darśana",
          summary:
            "A pluralist tradition with an ethics of radical non-violence and an epistemology of many-sidedness.",
          description:
            "Jain philosophy, shaped decisively by Mahāvīra in roughly the 6th century BCE, envisions a universe populated by countless eternal souls (jīvas) entangled with subtle karmic matter. Liberation demands a long ethical discipline centered on non-violence (ahiṃsā), truthfulness, and restraint. Its distinctive epistemology, anekāntavāda, argues that every claim is true only from a particular standpoint, so careful philosophy has to keep track of which standpoint it is speaking from."
        },
        {
          id: "buddhism",
          name: "Buddhism",
          sanskrit: "Bauddha-darśana",
          summary:
            "A path founded by Siddhārtha Gautama that diagnoses existence as marked by impermanence, suffering, and non-self.",
          description:
            "Buddhism begins with a medical framing: suffering exists, it has a cause, it can cease, and there is a path to its cessation. In philosophical terms this is spelled out as a careful analysis of what a person actually is — a stream of impermanent physical and mental events — and of how clinging to a stable self generates bondage. Over time Buddhism branched into several major streams that disagreed about metaphysics, practice, and the goal of the path.",
          children: [
            {
              id: "theravada",
              name: "Theravāda",
              sanskrit: "Theravāda",
              summary:
                "The older conservative stream, preserved in Pāli, that emphasizes personal liberation through careful analysis of experience.",
              description:
                "Theravāda — the 'teaching of the elders' — remains closest to the early Pāli canon. Its philosophical backbone is abhidhamma, a sustained project of breaking down experience into its smallest identifiable events and mapping their causal relations. The ideal figure is the arahant, a person who has seen through the illusion of self and extinguished the causes of rebirth."
            },
            {
              id: "mahayana",
              name: "Mahāyāna",
              sanskrit: "Mahāyāna",
              summary:
                "The 'great vehicle' that centers the bodhisattva ideal and develops sophisticated metaphysics of emptiness and mind.",
              description:
                "Mahāyāna emerged around the first centuries of the Common Era, foregrounding the bodhisattva — someone who postpones final liberation to work for the awakening of all beings. Its philosophical literature reworks the early tradition by arguing that even the building blocks of experience are themselves empty, and by analyzing the deep structure of consciousness that makes ordinary experience possible.",
              children: [
                {
                  id: "madhyamaka",
                  name: "Madhyamaka",
                  sanskrit: "Madhyamaka",
                  summary:
                    "The 'middle way' school that argues all phenomena are empty of intrinsic existence.",
                  description:
                    "Founded by Nāgārjuna, Madhyamaka proceeds almost entirely by critique. Every positive philosophical thesis it encounters is pressed until it contradicts itself, and from these contradictions Nāgārjuna draws the conclusion that nothing has independent, self-standing existence. Things are real only as dependently originated and conceptually designated. The goal is not a new metaphysics but the loosening of every grasp at one."
                },
                {
                  id: "yogacara",
                  name: "Yogācāra",
                  sanskrit: "Vijñānavāda",
                  summary:
                    "The 'yoga practice' or 'mind-only' school that analyzes experience as structured by consciousness.",
                  description:
                    "Associated with Asaṅga and Vasubandhu, Yogācāra studies how experience is constructed by deep layers of consciousness, especially a basal storehouse mind that carries karmic residues and a secondary mind that produces the sense of being a subject facing an object. Liberation is the transformation of this basal mind so that the subject–object split ceases to organize experience."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "concepts",
      name: "Core Concepts",
      sanskrit: "Pariṣadāḥ",
      summary:
        "Ideas that cut across almost every school and set the shared vocabulary of Indian philosophical debate.",
      description:
        "Even when the schools disagree, they are disagreeing about largely the same concepts. This branch collects the ideas a reader encounters everywhere — what a person is, what binds them, and what it would mean to be free. Understanding these in outline makes the individual schools easier to follow, because each one is essentially a particular take on the same short list of problems.",
      children: [
        {
          id: "dharma",
          name: "Dharma",
          sanskrit: "Dharma",
          summary:
            "A wide-ranging term for cosmic order, moral duty, righteousness, and whatever sustains a thing as itself.",
          description:
            "Dharma is one of the richest and most context-sensitive terms in Indian thought. Depending on setting it can mean the impersonal order of the cosmos, a person's moral duty, the defining nature of a thing, or the teaching of a tradition. Part of learning the vocabulary is learning to read which sense is operative in a given passage."
        },
        {
          id: "karma",
          name: "Karma",
          sanskrit: "Karma",
          summary:
            "The causal principle that intentional actions leave residues that shape later experience.",
          description:
            "In its philosophical use karma is not fate; it is a precise, if disputed, claim about causation. Intentional actions leave a trace in the psychological or cosmic order, and that trace eventually ripens into an experience of the same moral flavor. The schools disagree on the exact mechanism — a subtle body, an unseen potency, a storehouse consciousness — but almost all of them take karma as a working assumption."
        },
        {
          id: "samsara",
          name: "Saṃsāra",
          sanskrit: "Saṃsāra",
          summary:
            "The beginningless cycle of birth, death, and rebirth driven by karma and ignorance.",
          description:
            "Saṃsāra names the predicament every Indian philosophical school is trying to solve. So long as there is grasping and ignorance, actions generate consequences that generate further actions, and the cycle continues across lifetimes. Releasing someone from saṃsāra is the practical target of almost every Indian metaphysics."
        },
        {
          id: "moksha",
          name: "Mokṣa",
          sanskrit: "Mokṣa / Mukti",
          summary:
            "Liberation: the final, irreversible end of bondage and suffering.",
          description:
            "Mokṣa is the goal, but what kind of goal it is varies dramatically by school. Advaita describes it as recognition that the self was never other than Brahman. Sāṃkhya presents it as the isolation of consciousness from matter. Theistic Vedānta paints it as loving proximity to a personal God. Buddhism, reframing the whole question, speaks instead of nirvāṇa — the extinguishing of the fires of craving."
        },
        {
          id: "atman",
          name: "Ātman",
          sanskrit: "Ātman",
          summary:
            "The self or subject of experience — defended, redefined, or denied depending on the school.",
          description:
            "Ātman is whatever plays the role of 'self' in a given philosophy. Advaita identifies it with Brahman. Sāṃkhya treats it as a plurality of pure, witnessing consciousnesses. Vaiśeṣika treats it as one of the substances that populate reality. Buddhism, famously, argues that there is no such enduring thing at all, and that what looks like a self is really a stream of interrelated events."
        },
        {
          id: "brahman",
          name: "Brahman",
          sanskrit: "Brahman",
          summary:
            "The ultimate reality of Upaniṣadic thought — infinite, uncaused, and the ground of everything.",
          description:
            "Brahman is the concept the Upaniṣads bequeath to Vedānta. It is described both without qualities (nirguṇa), as the bare ground of being, and with qualities (saguṇa), as a personal God who creates and sustains the world. How the individual self relates to Brahman is the organizing question of every Vedāntic school."
        },
        {
          id: "pramana",
          name: "Pramāṇas",
          sanskrit: "Pramāṇa",
          summary:
            "The accepted instruments of valid knowledge — the sources a school will allow a philosopher to appeal to.",
          description:
            "Classical Indian epistemology is built around an explicit list of pramāṇas. Schools differ on which sources they admit: perception alone for Cārvāka; perception and inference for Buddhism; perception, inference, comparison, and testimony for Nyāya; plus postulation and non-apprehension in Mīmāṃsā. The list a school accepts largely decides what it can prove."
        },
        {
          id: "purusartha",
          name: "Puruṣārthas",
          sanskrit: "Puruṣārtha",
          summary:
            "The four legitimate aims of human life: duty, material welfare, pleasure, and liberation.",
          description:
            "The puruṣārthas — dharma, artha, kāma, and mokṣa — structure the classical Hindu account of a good life. Duty, material welfare, and pleasure are to be pursued in an ordered balance, and liberation is the aim that eventually subsumes the others. The scheme provides a framework in which philosophical and practical concerns are expected to fit together rather than compete."
        }
      ]
    }
  ]
};

export default hierarchy;
