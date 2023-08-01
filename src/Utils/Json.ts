import Images from './Images';

export const imgSelection = [
  {id: 1, img: Images.profile1},
  {id: 2, img: Images.profile3, label: 'pick'},
  {id: 3, img: Images.profile2},
];

export const insitutes = [
  {id: 1, title: 'highSchool'},
  {id: 2, title: 'university'},
];

export const highSchool = [
  {id: 1, title: 'region'},
  {id: 2, title: 'city'},
  {id: 3, title: 'school'},
];

export const uni = [
  {id: 1, title: 'selectRegion'},
  {id: 2, title: 'selectUniversity'},
];

export const conditions = [
  {id: 1, title: 'conditon', selected: false},
  {id: 2, title: 'eulaCondition', selected: false},
  {id: 3, title: 'policy', selected: false},
];

export const getAllBooks = [
  {
    id: 1,
    name: 'Luke\nReese',
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    profile: Images.dummyProfile,
    ISBN: '9788842114055',
    condition: ['Excellent conditions', 'Exercises almost done'],
    bookImg: [Images.book3, Images.book4],
    price: '€34,00',
  },
  {
    id: 2,
    name: 'Luke\nReese',
    title: 'Lo Spazio del Tempo',
    img: Images.book2,
    profile: Images.dummyProfile,
    ISBN: '9788842114055',
    condition: ['Excellent conditions', 'Exercises almost done'],
    bookImg: [Images.book3, Images.book4],
    price: '€34,00',
  },
  {
    id: 3,
    name: 'Luke\nReese',
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    profile: Images.dummyProfile,
    ISBN: '9788842114055',
    condition: ['Excellent conditions', 'Exercises almost done'],
    bookImg: [Images.book3, Images.book4],
    price: '€34,00',
  },
  {
    id: 4,
    name: 'Luke\nReese',
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    profile: Images.dummyProfile,
    ISBN: '9788842114055',
    condition: ['Excellent conditions', 'Exercises almost done'],
    bookImg: [Images.book3, Images.book4],
    price: '€34,00',
  },
  {
    id: 5,
    name: 'Luke\nReese',
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    profile: Images.dummyProfile,
    ISBN: '9788842114055',
    condition: ['Excellent conditions', 'Exercises almost done'],
    bookImg: [Images.book3, Images.book4],
    price: '€34,00',
  },
  {
    id: 6,
    name: 'Luke\nReese',
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    profile: Images.dummyProfile,
    ISBN: '9788842114055',
    condition: ['Excellent conditions', 'Exercises almost done'],
    bookImg: [Images.book3, Images.book4],
    price: '€34,00',
  },
];

export const myBooks = [
  {
    id: 1,
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    price: '€34,00',
  },
  {
    id: 2,
    title: 'Lo Spazio del Tempo',
    img: Images.book2,
    price: '€34,00',
  },
  {
    id: 3,
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    price: '€34,00',
  },
  {
    id: 4,
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    price: '€34,00',
  },
  {
    id: 5,
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    price: '€34,00',
  },
  {
    id: 6,
    title: 'Lo Spazio del Tempo',
    img: Images.book1,
    price: '€34,00',
  },
];

export const bookConditon = [
  {id: 1, title: 'brandNew'},
  {id: 2, title: 'excellent'},
  {id: 3, title: 'good'},
  {id: 4, title: 'fair'},
  {id: 5, title: 'bad'},
];
export const bookExercise = [
  {id: 1, title: 'noExercise'},
  {id: 2, title: 'blankExercises'},
  {id: 3, title: 'fewExercises'},
  {id: 4, title: 'halfExercises'},
  {id: 5, title: 'exercisesAlmost'},
  {id: 6, title: 'allExercises'},
];

export const imgArr = [
  {id: 1, img: Images.galley},
  {id: 2, img: Images.galley},
];
export const settings = [
  {id: 1, title: 'research', route: 'ResearchSettings'},
  {id: 2, title: 'language', route: 'Language'},
  {id: 3, title: 'change', route: 'ChangeEmailPassword'},
  {id: 4, title: 'contact', route: 'ContactUs'},
  {id: 5, title: 'condition', route: 'Instructions'},
  {id: 6, title: 'privacy', route: 'Instructions'},
  {id: 7, title: 'eula', route: 'Instructions'},
  {id: 8, title: 'deleteAccount', route: 'DeleteAccount'},
  {id: 9, title: 'logOut', route: 'AuthStack'},
];

export const research = [
  {
    id: 1,
    title: 'researchOption',
  },
  {
    id: 2,
    title: 'researchOption1',
  },
];

export const language = [
  {
    id: 1,
    title: 'italian',
    image: Images.italyFlag,
  },
  {
    id: 2,
    title: 'english',
    image: Images.ukFlag,
  },
];

export const contactArr = [
  {
    id: 1,
    title: 'forInformation',
    contact: 'info@bookstreet.it',
  },
  {
    id: 2,
    title: 'forAssistence',
    contact: 'support@bookstreet.it',
  },
];

export const chatData = [
  {
    id: 1,
    img: Images.profile1,
    name: 'Monna Lisa',
    newMsg: 'Yes',
    lastMsg: '',
    newMsgCounter: 1,
    time: '',
  },
  {
    id: 2,
    img: Images.profile2,
    name: 'Napoleone Bonaparte',
    newMsg: '',
    lastMsg: 'As Well',
    newMsgCounter: 0,
    time: '9:36',
  },
];

export const getAllRegion = [
  'Abruzzo',
  'Basilicata',
  'Calabria',
  'Campania',
  'Emilia-Romagna',
  'Friuli-Venezia Giulia',
  'Lazio',
  'Liguria',
  'Lombardia',
  'Marche',
  'Molise',
  'Piemonte',
  'Puglia',
  'Sardegna',
  'Sicili',
  'Toscan',
  'Trentino-Alto Adige',
  'Umbria',
  "Valle d'Aosta",
  'Veneto',
];

export const decayData = {
  A: "It's brand new",
  B: 'Excellent conditions',
  C: 'Good conditions',
  D: 'Fair conditions',
  E: 'Bad conditions',
};

export const usageData = {
  A: 'No exercises',
  B: 'Blank exercises',
  C: 'A few exercises done',
  D: 'Half exercises done',
  E: 'Exercises almost done',
  F: 'All exercises done',
};

export const termsData = `This  document contains the general  terms  and  conditions on the basis of which the use of  the  application Bookstreet  that  provides a digital platform where you can advertise your used books is offered by Third-party Providers

1.  Definitions\n
To allow a complete understanding and acceptance of these terms and conditions, the following terms, in the singular and in the plural, shall have the meaning indicated below:\n
Owner: Ruggero Giorgetti, Via Amatore Sciesa 21, 20135 Milano, GRGRGR04A12F205B\n
Application: the application Bookstreet\n
Products:\n
User: any person who accesses and uses the Application\n
Third-party Provider: the natural or legal person, other than the Owner, who offers the Products through the Application in the performance of their trade, business or profession\n
Content:  any  textual  or  multimedia  element  in  the  Application,  by  way  of  example  announcements,  insertions,  reviews, images, etc.\n
Conditions: this contract which governs the relationship between the Owner and the Users.\n
2.  Relationship between the Owner, Third-party Providers and Users\n
The Application hosts a platform managed by the Owner which allows the contact of Users interested in the Products offered by Third-party Providers.\n
Should  the Products  be  offered  by a Third-party  Provider, the Owner is not party to the relationship  between the User and the Third-party Provider and therefore shall not be under any liability from such relationship. The Owner shall be considered only as a mere technical operator of the Application. Therefore, any contract entered into between Third-party Providers and Users is not subject to the Conditions.
3.  Detailed information on the Application’s offer
The Application provides Users the possibility to publish ads about your study books which the user uses attending his university, in  order  to  be  contacted  by  other  students  of  the  same  university  through  a  book  search  system  and  a  messaging  chat.  The application  is  free  and  does  not  take  part  in  any  sale  or  exchange  of  used  books  published  by  a  user;  it  in  fact  has  the  sole purpose  of  putting  in  contact  students  interested  in  selling  their  used  books  to  other  students,  which  are  interested  in  buying them without requiring any cost for the use of the service.\n
4.  Scope of the Conditions
The use of the Application implies full acceptance of the Conditions by the User. Should the User not accept the Conditions and/or any other note, legal notice, information published or referred to therein, the User shall not use the Application or the services related.\n
The  Owner  may  amend  the  Conditions  at  any  time. The  changes  shall  be  effective  from  the  time  they  are  published  in  the Application.\n
Before using the Application, the User is required to read the Conditions carefully save or print them for future reference.\n
The  Owner reserves  the  right  to  change,  at  his own  discretion  and  at  any time, even  after  the  User  has  registered, the  graphic interface of the Application, the Contents and their organisation, as well as any other feature that characterises the functionality and management of the Application, communicating to the User the relative instructions, when necessary.\n
5.  Registration
To  take  advantage  of  the  features  of  the  Application,  the  User  shall  register  and  provide,  truthfully  and  completely,  all  data requested in the registration form and accept the privacy policy ( www.bookstreet.it/privacyeng) and the Conditions.\n
The User has the responsibility to keep login credentials. The login credentials shall be used exclusively by the User and cannot be transferred to third parties. The User undertakes to keep them conffidential and to ensure that no third party has access to them. Should the User suspect or become aware of any improper use or disclosure, he shall immediately inform the Owner.\n
The  User  guarantees  that  the  personal  information  provided  during  the  registration  procedure  is  complete  and  truthful  and undertakes  to  hold  the  Owner  harmless  from  any  damage,  indemnity  and  /  or  penalty  resulting  from  and  /  or  in  any  way connected to the infringement by the User of the Application registration rules or the storage of the login credentials.\n
6.  Account cancellation and closure
The  registered User can interrupt  the  use  of the Application at any time and deactivate  his  account or request  the  cancellation through the Application interface, if possible, or by sending a written communication to the e-mail address support@bookstreet.it. \n
In case of violation by the User of the Conditions or of the applicable legal provisions, the Owner reserves the right to suspend or close the User's account at any time and without notice.\n
7.  Content sent by the Users\n
The  User  can  upload  Content  on  the  Application,  provided  that  it  is  not  illegal  (e.g.  obscene,  intimidating,  defamatory, pornographic, abusive or for any reason illegal or in violation of privacy, the intellectual and / or industrial property rights of the Owner  and  /  or  third  parties),  misleading,  or  is  not  otherwise  harmful  to  the  Owner  and  /  or  third  parties  or  contains  viruses, political  propaganda, commercial  solicitation,  mass  e-mail  or  any  other form  of  spamming.  In  the event  of  a  dispute  by  a  third party  regarding  any  announcement  or  conduct  related  to  it,  the  User  assumes  full  liability  and  undertakes  to  hold  the  Holder harmless from any damage, loss or expense.\n
The  User  guarantees  that  the  Contents  are  sent  to  the  Application  through his  account  from a natural  person of legal  age.  For natural persons under legal age, the sending of Contents must be examined and authorised by the parents or by those exercising parental authority.\n
The  User  is  the  sole  and  exclusive  responsible  for  the  use  of  the  Application  with  regard  to  the  publication,  consultation, management of the Content and contact between Users and is therefore the sole guarantor and responsible for the correctness, completeness and lawfulness of the Contents and its own behaviour.\n
It is forbidden to use an e-mail address that is not owned by the User, to use the personal data and credentials of another User in order to use his identity, or in any other way to declare false information about the origin of the Contents.\n
The  Owner is unable  to  ensure  timely control  over the  Content  received  and reserves  the right  at  any  time  to  cancel, move  or modify the Content, which, at its discretion, appears to be illegal, abusive, defamatory, obscene or prejudicial to the right to author and trademarks or in any case unacceptable.\n
Users grant the Owner a non-exclusive right of use on the Content sent, without limitations of geographical areas. The Owner may therefore,  directly  or  through  trusted  third  ies,  use,  modify,  copy,  transmit,  extract,  publish,  distribute,  publicly  perform, disseminate, create derivative works, host, index, store, note, encode, modify and adapt (including without limitation the right to adapt for transmission in any form of communication) in any form, any Content (including images, messages, including audio and
video) that should be sent by the User, including through third parties.\n
The Content sent will not be returned and the Owner will not be liable towards Users for the loss, modiffcation or destruction of the transmitted Content.\n
It  is  expressly  forbidden,  unless  explicitly  authorised  by  the  Owner:  i)  the  use  of  automatic announcement  uploading  systems, except those expressly authorised, ii) serial publication and / or management of advertisements for third parties by any means or method, iii) resell the Owner's services to third parties.\n
8.  Industrial and intellectual property rights
All the contents of the Application, including texts, documents, trademarks, logos, images, graphics, their arrangement and their adaptations are protected by copyright and trademark legislation. The Application may also contain images, documents, logos and trademarks  of  third  parties  which  have  expressly  authorized  the  Owner  to  be  published  in  the  Application.  Except  for  strictly personal  uses,  it  is  not  allowed  to  copy,  alter,  distribute,  publish  or  use  the  Contents  without  the  specic  authorization  of  the Owner.\n
9.  Exclusion of warranty
The Application is provided "as is" and "as available" and the Owner does not provide any explicit or implicit guarantee in relation to the Application, nor does it provide any guarantee that the Application will satisfy the needs of the Users or that it will not have never interrupt or be error-free or free of viruses or bugs.\n
The Owner will endeavour to ensure that the Application is available continuously 24 hours a day, but cannot in any way be held responsible if, for any reason, the Application is not accessible and / or operational at any time or for any period . Access to the Application may be suspended temporarily and without notice in the event of system failure, maintenance, repairs or for reasons wholly unrelated to the owner's will or due to force majeure events.
10.  Limitation of liability
The Owner shall not be held liable towards the User, except in the case of wilful misconduct or gross negligence, for disservices or malfunctions connected to the use of the internet outside of its own control or that of its suppliers.\n
Furthermore, the Owner will not be liable for damages, losses and costs incurred by the User as a result of failure to execute the contract for reasons not attributable to him.\n
The Owner assumes no responsibility for any fraudulent or illegal use that may be made by third parties of credit cards and other means of payment,\n
The Owner shall not be held liable for:
 - any loss of business opportunities and any other loss, even indirect, possibly suffered by the User that is not a direct result of the breach of contract by the Owner
 - incorrect or unsuitable use of the Application by Users or third parties\n\n
In no case the Owner shall be held liable for a sum greater than twice the cost paid by the User.\n
11.  Force majeure
The  Owner  shall  not  be  held  responsible  for  the  failure  or  late  fulfflment  of  its  obligations,  due  to  circumstances  beyond  its reasonable  control  due  to  events  of  force  majeure  or,  in  any  case,  to  unforeseen  and  unforeseeable  events  and,  in  any  case, independent of its will.\n
The  fulfflment  of  the obligations  by  the  Owner  shall  be  considered  suspended  for  the  period  in  which  events  of  force  majeure occur. \nThe  Owner  will  perform  any  act  in  his  power  in  order  to  identify  solutions  that  allow  the  correct  fulfflment  of  his  obligations despite the persistence of events due to force majeure.
12.  Links to third-party web sites
The Application may contain links to third-party web sites / applications. The Owner has no control over them and, therefore, is in no way responsible for the contents of these sites / applications.\n Some of these links may link to third-party sites / applications that provide services through the Application. In these cases, the general conditions for the use of the site / application and for the use of the service prepared by the third parties will be applied to the individual services, with respect to which the Owner assumes no responsibility.
13.  Privacy
The protection and processing of personal data will be in accordance with the Privacy Policy which can be consulted on the page www.bookstreet.it/privacyeng \n
14.  Applicable law and jurisdiction\n
The Conditions are subject to Italian law.\n
For Consumer Users, any dispute concerning the application, execution and interpretation of these Conditions shall be referred to courts  where  the  Consumer  User  resides  or  has  elected  domicile,  if  located  in  the  territory  of  the  Italian  Republic,  without prejudice to the right of the User Consumer of going to court other than the "consumer court" pursuant to Section 66 bis of the Italian  Consumer  Code,  competent  for  the  territory  according  to  one  of  the  criteria  of  the  Sections  18,  19  and  20  of  the  civil procedural code.
\nThe application to Consumer Users who do not have their residence or domicile in Italy of any more favourable and mandatory provisions established by the law of the country in which they have their residence or domicile is reserved, in particular in relation to  the  term  for  the  exercise  of  the  right  of  withdrawal,  after  the  return  of  the  Products,  in  case  of  exercise  of  this  right,  the formalities of the communication and the legal guarantee of conformity. \nFor Users who are not Consumers, any dispute concerning the application, execution and interpretation of these Conditions will be referred to the forum of the place where the Owner is based.
15.  Online dispute resolution for Consumer Users
The  consumer  user  residing  in  Europe  shall  be  aware  of  the  fact  that  the  European  Commission  has  established  an  online platform that provides an alternative dispute resolution tool. This tool can be used by the Consumer User to resolve any dispute relating to and / or deriving from contracts for the sale of goods and the provision of services concluded online. Consequently, the Consumer User can use this platform for the resolution of any dispute arising from the contract entered into online. The platform is available at the following address: ec.europa.eu/consumers/odr/

Date 26/01/2023
`;

export const privacyData = `The purpose of this document is to inform the natural person (hereinafter “Data Subject”) about the processing of his/her personal data(hereinafter  “Personal  Data”)  collected  by  the  data  controller, Ruggero  Giorgetti, Via  Amatore  Sciesa  21,  20135  Milano, Tax  CodeGRGRGR04A12F205B, e-mail  support@bookstreet.it, (hereinafter  “Data  Controller”),  via the  application Bookstreet  (hereinafter“Application”).Changes and updates will be eective as soon as they are published on the Application. In case of non-acceptance of the changes madeto the Privacy Policy, the Data Subject shall stop using this Application and may ask the Data Controller to delete his/her Personal Data.\n
1.Categories of Personal Data processedThe Data Controller processes the following types of Personal Data voluntarily provided by the Data Subject:Contact Data: rst name, last name, address, e-mail address, phone number, pictures, authentication credentials, any furtherinformation sent by the Data Subject, etc.If the Data  Subject decides not to provide Personal  Data for which  there is a legal  or  contractual obligation, or if such  data is anecessary requirement for the conclusion of the contract with the Data Controller, it will be impossible for the Data Controller toestablish or continue any relationship with the Data Subject.The Data Subject who communicates Personal Data of third parties to the Data Controller is directly and exclusively liable for theirorigin, collection, processing, communication or divulgation.\n
2.Cookies and similar technologiesCookies  are  not  used  for  the  transmission  of  personal  information,  and  neither  are  persistent  cookies  of  any  kind  used,  i.e.systems for tracing the Data Subjects. Therefore, the Application does not acquire the Personal  Data of the Data Subjects usingthese technologies. Use is made of session technical cookies (not persistent), strictly limited to what is necessary for the safe andefficient navigation of the Application.\n 
3.Legal basis and purpose of data processingThe processing of Personal Data is necessary:\n
a.for the performance of the contract with the Data Subject and especially:\n
1.fulfillment of any obligation arising from the pre-contractual or contractual relationship with the Data Subject\n
2.registration and authentication of the Data Subject: to allow the Data Subject to register in the Application, to access itand to be identified in it, also via external platforms\n
3.support and contact with the Data Subject: to answer the Data Subject's requests\n
b.for legal obligations and especially:\n
1.the fullment  of  any  obligation  provided  for  by  the applicable  norms, laws  and  regulations,  in particular,  on tax  andfiscal mattersc.  for the legitimate interest of the Data Controller, for:\n
1.anonymous data based statistics: in order to carry out statistical analysis on aggregated and anonymous data in order toanalyze behaviors of the Data Subject to improve products and/or services provided by the Data Controller and better meetthe expectations of the Data SubjectOn the basis of the legitimate interest of the Data Controllerowner, the application allows interactions with external web platformsor\n
 social networks whose processing of personal data is governed by their respective privacy policies to which please refer. \n
 Theinteractions and information acquired by this Application are in any case subject to the privacy settings that the Data Subject haschosen  on  such  platforms  or  social  networks.\n
   Such  information  -  in  the  absence  of  specic  consent  to  processing  for  otherpurposes - is used exclusively to allow the use of the Application and to provide the information and services requested.\n
   The  Data  Subject's  Personal  Data  may  also  be  used  by  the  Data  Controller  to  protect  itself  in  judicial  proceedings  before  thecompetent courts.\n
   4.  Data processing methods and receivers of Personal DataThe processing of Personal Data is performed via paper-based and computer tools with methods of organization and logics strictlyrelated to the specified purposes and through the adoption of appropriate security measures.Personal Data are processed exclusively by:persons authorized by the Data Controller to process Personal Data who have committed themselves to condentiality or havean appropriate legal obligation of confidentiality;\n
  subjects  that  operate  independently  as  separate  data  controllers  or  by  subjects  designated  as  data  processors  by  the  DataController in order to carry out all the processing activities necessary to pursue the purposes set out in this policy\n
(for example,  1 di 2 © 2023 www.LexDo.it
business partners, consultants, IT companies, service providers, hosting providers);subjects or bodies to whom it is mandatory to communicate Personal Data by law or by order of the authorities.The subjects listed above are required to use appropriate measures and guarantees to protect Personal Data and may only accessdata necessary to perform their duties.Personal Data will not be indiscriminately shared in any way.\n 
5.PlacePersonal Data will not be transferred outside the territory of the European Economic Area (EEA).\n
6.  Personal Data storage periodPersonal Data will be stored for the period of time that is required to fulfill the purposes for which it was collected. In particular:for purposes related to the execution of the contract between the Data Controller and the Data Subject, will be stored for theentire duration of the  contractual  relationship  and, after  termination,  for the ordinary prescription period  of  10 years.  In  theevent of legal disputes, for the entire duration of such disputes, until the time limit for appeals has expiredfor purposes related to legitimate interests of the Data Controller, they will be stored until the fulfilment of such interestin  compliance  with  legal  obligations,  by  order  of  an  authority  and  for  legal  protection,  they  shall  be  stored  according  to  therelevant  timeframes  provided  for  by  such  obligations,  regulations  and,  in  any  case,  until  the  expiry  of  the  prescriptive  termprovided for by the rules in forcefor purposes based on the consent of the Data Subject, they will be stored until the consent is revokedAt the end of the conservation period, \n
all Personal Data will be deleted or stored in a form that does not allow the identication ofthe Data Subject.\n
7.  Rights of the Data SubjectData Subjects may exercise specic  rights regarding the Personal Data  processed by  the Data Controller. In particular,\n
 the  DataSubject has the right to:be informed about the processing of their Personal Datawithdraw consent at any timerestrict the processing of his or her Personal Dataobject to the processing of their Personal Dataaccess their Personal Dataverify and request the rectification of their Personal Datarestrict the processing of their Personal Dataobtain the erasure of their Personal Datatransfer their Personal Data to another data controllerfile a complaint with the Personal Data protection supervisory authority \n
 and/or take legal action.In order to use their rights, Data Subjects may send a request to the following e-mail address support@bookstreet.it. Requests willbe immediately treated by the Data Controller and processed as soon as possible, in any case within 30 days.Last update: 27/01/2023`;

export const eulaData = `This End-User License Agreement ("EULA") is a legal agreement between you and RuggeroGiorgetti. Our EULA was created by EULA Template for Bookstreet.This EULA agreement governs your acquisition and use of our Bookstreet software ("Software")directly from Ruggero Giorgetti or indirectly through a Ruggero Giorgetti authorized reseller ordistributor (a "Reseller").Please read this EULA agreement carefully before completing the installation process and usingthe Bookstreet software. It provides a license to use the Bookstreet software and containswarranty information and liability disclaimers.By clicking "accept" or installing and/or using the Bookstreet software, you are confirming youracceptance of the Software and agreeing to become bound by the terms of this EULAagreement.If you are entering into this EULA agreement on behalf of a company or other legal entity, yourepresent that you have the authority to bind such entity and its affiliates to these terms andconditions. If you do not have such authority or if you do not agree with the terms and conditionsof this EULA agreement, do not install or use the Software, and you must not accept this EULAagreement.This EULA agreement shall apply only to the Software supplied by Ruggero Giorgetti herewithregardless of whether other software is referred to or described herein. The terms also apply toany Ruggero Giorgetti updates, supplements, Internet-based services, and support services forthe Software, unless other terms accompany those items on delivery. If so, those terms apply.License GrantRuggero Giorgetti hereby grants you a personal, non-transferable, non-exclusive licence to usethe Bookstreet software on your devices in accordance with the terms of this EULA agreement.You are permitted to load the Bookstreet software (for example a PC, laptop, mobile or tablet)under your control. You are responsible for ensuring your device meets the minimumrequirements of the Bookstreet software.\n 
You are not permitted to:\n
● Edit, alter, modify, adapt, translate or otherwise change the whole or any part of theSoftware nor permit the whole or any part of the Software to be combined with or becomeincorporated in any other software, nor decompile, disassemble or reverse engineer theSoftware or attempt to do any such things\n
● Reproduce, copy, distribute, resell or otherwise use the Software for any commercialpurpose\n
● Allow any third party to use the Software on behalf of or for the benefit of any third party\n
● Use the Software in any way which breaches any applicable local, national orinternational law\n
● use the Software for any purpose that Ruggero Giorgetti considers is a breach of thisEULA agreement such as publish other content than used books\n 
● Publish objectionable content or any content that is not about your used books (there isno tolerance for publishing forbidden contents)Intellectual Property and OwnershipRuggero\n
 Giorgetti shall at all times retain ownership of the Software as originally downloaded byyou and all subsequent downloads of the Software by you.\n
 The Software (and the copyright, andother intellectual property rights of whatever nature in the Software, including any modificationsmade thereto) \n
 are and shall remain the property of Ruggero Giorgetti.Ruggero Giorgetti reserves the right to grant licences to use the Software to third parties.TerminationThis EULA agreement \n
 is effective from the date you first use the Software and shall continueuntil terminated. You may terminate it at any time upon written notice to info@bookstreet.it.It will also terminate immediately if you fail to comply with any term of this EULA agreement.\n
 Upon such termination, the licenses granted by this EULA agreement will immediately\n
terminateand you agree to stop all access and use of the Software. The provisions that by their naturecontinue and survive will survive any termination of this EULA agreement.Governing LawThis EULA agreement, and any dispute arising out of or in connection with this EULA agreement,shall be governed by and construed in accordance with the laws of it`;
