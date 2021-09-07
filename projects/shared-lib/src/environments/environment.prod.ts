// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import env from './.env';

export const environment = {
  idUniteBancaire: 1,
  codeUniteBancaire: "00001",
  codeAgence: "0904",
  codeDevise: "950",
  production: false,
  version: env.microfi_x_version, //+ '-dev',
  microfiPlatformTenantId: 'default',  // For connecting to server running elsewhere update the tenant identifier 192.168.202.91
  baseApiUrl: JSON.parse(localStorage.getItem('microfiXServerBranchUrl')) || 'http://192.168.202.91:5833',  // For connecting to server running elsewhere update the base API URL
  allowServerSwitch: env.allow_switching_backend_instance,
  apiProvider: '/api', // /resource
  apiVersion: '',// /v1
  serverUrl: '',
  oauth: {
    enabled: true,  // For connecting to Microfi X using OAuth2 Authentication change the value to true
    serverUrl: ''
  },
  jwt: {
    enabled: false,  // For connecting to Microfi X using OAuth2 Authentication change the value to true
    serverUrl: 'http://172.21.253.31:5933/auth/'
  },
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ],
  routes: {
    physicalCustomerList: { url: 'physic-list', breadcumb: 'Personnes Phyisques', roles: ['*'] },
    physicalCustomer: { url: 'physic-view', breadcumb: 'Details Personne Physique', roles: ['*'] },
    moralCustomerList: { url: 'moral-list', breadcumb: 'Personne morale' },
    moralCustomer: { url: 'moral-view', breadcumb: 'Details Personne morale' },
    shares: { url: 'shares', breadcumb: 'Gestion des parts socials' },
    account: { url: 'account', breadcumb: 'Gestion des comptes' },
    sleeperAccount: { url: 'sleeper-account', breadcumb: 'Gestion des comptes dormants' },
    accountView: { url: 'account-view/:id', breadcumb: 'Detail compte' },
    closedAccountView: { url: 'closed-account-view', breadcumb: 'Details fermeture compte' },
    oppositionView: { url: 'opposition-view', breadcumb: 'Details opposition compte' },
    reservationView: { url: 'reservation-view', breadcumb: 'Details reservation compte' },
    closedAccount: { url: 'closed-account', breadcumb: 'Gestion des comptes fermes' },
    accountHistory: { url: 'history-account', breadcumb: 'Gestion des historiques des comptes' },
    accountOpposition: { url: 'account-opposition', breadcumb: 'Gestion des oppositions des comptes' },
    accountPosition: { url: 'account-postion', breadcumb: 'Gestion des positions des comptes' },
    reservation: { url: 'account-reservation', breadcumb: 'Gestion des reservations des comptes' },
    accountManager: { url: 'account-manager', breadcumb: 'Gestion des gestionnaires' },
    accountManagerView: { url: 'account-manager-view', breadcumb: 'Details gestionnaire' },
    accountManagerHistory: { url: 'account-manager-history', breadcumb: 'Historique gestionnaire' },
    customerOpposition: { url: 'customer-opposition', breadcumb: 'Gestion des oppositions clients' },
    customerOppositionView: { url: 'customer-opposition-view', breadcumb: 'Details des oppositions client' },
    deadCustomer: { url: 'dead-customer', breadcumb: 'Gestion des clients decedes' },
    deadCustomerView: { url: 'dead-customer-view', breadcumb: 'Details client decede' },
    memberShipFees: { url: 'member-ship-fees', breadcumb: 'Frais adhesion' },
    membersShare: { url: 'members-share', breadcumb: 'Part des membres' },
    reimboursementShare: { url: 'reimboursement-share', breadcumb: 'Remboursement des parts' },
    shareReports: { url: 'share-reports', breadcumb: 'Rapports' },
    shareSettings: { url: 'share-settings', breadcumb: 'Parametres' },
    solidarityFundIncreasing: { url: 'solidarity-fund-increasing', breadcumb: 'Augmentation fond solidarite' },
    subscriptionShares: { url: 'subscription-shares', breadcumb: 'Souscription' },
    transfertShares: { url: 'transfert-shares', breadcumb: 'Cession de parts' },
    transfertSharesView: { url: 'transfert-shares-view', breadcumb: 'Cession de parts details' },
    dailyCollectionSetting: { url: 'daily-collection-setting', breadcumb: 'Parametre collecte journalière' },
    dailyCollectionEntry: { url: 'daily-collection-entry', breadcumb: 'Saisie collecte journalière' },
    dailyCollectionConsultation: { url: 'daily-collection-consultation', breadcumb: 'Consultation collecte journalière' },
    dailyCollectionStatement: { url: 'daily-collection-statement', breadcumb: 'Arrêté collecte journalière' },
    accountPositionHistory: { url: 'account-position-history', breadcumb: 'Position historique compte' },
    accountCancelReservation: { url: 'account-cancel-reservation', breadcumb: 'Levée reservation compte' },
    accountCancelOpposition: { url: 'account-cancel-opposition', breadcumb: 'Levée Opposition compte' },
    cashierAdjustmentAndClosing: { url: 'cashier-adjustment-and-closing', breadcumb: 'Ajustage et fermeture de caisse' },
    cashierAutomaticAdjustment: { url: 'cashier-automatic-adjustment', breadcumb: 'Ajustage automatique de caisse' },
    cashierAutomaticClosing: { url: 'cashier-automatic-closing', breadcumb: 'Fermture automatique de caisse' },
    cashierOpening: { url: 'cashier-opening', breadcumb: 'Ouverture de caisse' },
    cashierReopening: { url: 'cashier-reopening', breadcumb: 'Réouverture de caisse' },
    cashoutMainCashier: { url: 'cashout-main-cashier', breadcumb: 'Sortie de fond caisse principale' },
    cashierForcingAdjustment: { url: 'cashier-forcing-adjustment', breadcumb: 'Forçage ajustage de caisse' },
    interCashierTransferMainToSecond: { url: 'inter-cashier-transfer-main-to-second', breadcumb: 'Transfert inter-caisse principale à secondaire' },
    interCashierTransferSecondToMain: { url: 'inter-cashier-transfer-second-to-main', breadcumb: 'Transfert inter-caisse secondaire à principale' },
    receiptInterCashierTransfer: { url: 'receipt-inter-cashier-transfer', breadcumb: 'Reception transfert inter-caisse' },
    supplyMainCashier: { url: 'supply-main-cashier', breadcumb: 'Approvisionnement caisse principale' },
    sameBranchDeposit: { url: 'same-branch-deposit', breadcumb: 'Versement même agence' },
    specificDeposit: { url: 'specific-deposit', breadcumb: 'Versement spécifique' },
    sameBranchWithdrawal: { url: 'same-branch-withdrawal', breadcumb: 'Retrait même agence' },
    cashierPayment: { url: 'cashier-payment', breadcumb: 'Paiment par caisse' },
    currencyChange: { url: 'currency-change', breadcumb: "Change d'espèce" },
    saleCurrency: { url: 'sale-currency', breadcumb: "Vente dévise" },
    buyCurrency: { url: 'buy-currency', breadcumb: "Achat dévise" },
    saleMps: { url: 'sale-mps', breadcumb: "Vente MPS" },
    reimbursementMps: { url: 'reimbursement-mps', breadcumb: "Remboursement MPS" },
    recoveryMps: { url: 'recovery-mps', breadcumb: "Reprise MPS" },
    oppositionMps: { url: 'opposition-mps', breadcumb: "Opposition MPS" },
    cancelOppositionMps: { url: 'cancel-opposition-mps', breadcumb: "Levée Opposition MPS" },
    fundReception: { url: 'fund-reception', breadcumb: "Réception de fonds" },
    fundTransfer: { url: 'fund-transfer', breadcumb: "Envoie de fonds" },
    cancelCertificationCheque: { url: 'cancel-certification-cheque', breadcumb: "Annulation certification chèque" },
    cancelChequeBank: { url: 'cancel-cheque', breadcumb: "Annulation chèque banque" },
    cancelChequeOpposition: { url: 'cancel-cheque-opposition', breadcumb: "Levée opposition chèque" },
    cashierChequeRemittance: { url: 'cashier-cheque-remittance', breadcumb: "Remise chèque de guichet" },
    certificationChequeBank: { url: 'certification-cheque', breadcumb: "Certification chèque" },
    chequeArbitration: { url: 'cheque-arbitration', breadcumb: "Arbitrage chèque" },
    chequeOpposition: { url: 'cheque-opposition', breadcumb: "Mise en opposition chèque" },
    chequeRemittanceInterBank: { url: 'cheque-remittance-interbank', breadcumb: "Remise chèque inter-banque" },
    chequeRemittanceInterBranch: { url: 'cheque-remittance-interbranch', breadcumb: "Remise chèque inter-agence" },
    chequeRemittanceSameBranch: { url: 'cheque-remittance-same-branch', breadcumb: "Remise chèque même agence" },
    chequeSpecificRemittance: { url: 'cheque-specific-remittance', breadcumb: "Remise chèque spécifique" },
    consultationChequeOpposition: { url: 'consultation-cheque-opposition', breadcumb: "consultation oppositions chèques" },
    issueChequeBank: { url: 'issue-cheque', breadcumb: "Emission chèque banque" },
    customerCheckbookRequestList: { url: 'customer-checkbook-request-list', breadcumb: "Demande chèquier clientèle" },
    internalCheckbookRequestList: { url: 'internal-checkbook-request-list', breadcumb: "Demande chèquier interne" },
    sortChequeInterBank: { url: 'sort-cheque-interbank', breadcumb: "Sort chèque inter-banque" },
    sortChequeInterBranch: { url: 'sort-cheque-interbranch', breadcumb: "Sort chèque inter-agence" },
    internalChequeRemittance: { url: 'internal-cheque-remittance', breadcumb: "Remise chèque clientele" },
    customerChequeRemittance: { url: 'customer-cheque-remittance', breadcumb: "Remise chèque interne" },
    chequeFromCompensation: { url: 'cheque-from-compensation', breadcumb: "Chèque reçu de la compensation" },
    multiTransferSameBank: { url: 'multi-transfer-same-bank', breadcumb: "Virement multiple même banque" },
    simpleTransferOnCustomerAccount: { url: 'simple-transfer-on-customer-account', breadcumb: "Virement simple sur comptes clientèles" },
    simpleTransferOnGeneralAccount: { url: 'simple-transfer-on-general-account', breadcumb: "Virement simple sur comptes généraux" },
    specificTransfer: { url: 'specific-transfer', breadcumb: "Virement spécifique" },
    standingTransferManagement: { url: 'standing-transfer-management', breadcumb: "Gestion virements permanents" },
    standingTransferOnCustomerAccount: { url: 'standing-transfer-on-customer-account', breadcumb: "Virement permanent sur comptes clientèles" },
    standingTransferOnGeneralAccount: { url: 'standing-transfer-on-general-account', breadcumb: "Virement permanent sur comptes généraux" },
    abandonDossierCredit: { url: 'abandon-dossier-credit', breadcumb: "Abandon du dossier de credit" },
    avenantDossierCredit: { url: 'avenant-dossier-credit', breadcumb: "Avenant du dossier de credit" },
    createAbandonInteretRetard: { url: 'create-abandon-interet-retard', breadcumb: "Creation de l'abandon des interet du retard" },
    updateAbandonInteretRetard: { url: 'update-abandon-interet-retard/:numdossier/:code', breadcumb: "Mise a jour de l'abandon des interet du retard" },
    createSimulatuionTableau: { url: 'create-simulation-tableau', breadcumb: "Creation de la simulation du tableau" },
    creditSimulatuionTableau: { url: 'credit-simulation-tableau', breadcumb: "Credit de la simulation du tableau" },

    simulatuionTableau: { url: 'simulation-tableau', breadcumb: "simulation du tableau" },

    deblocageTableau: { url: 'deblocage-credit', breadcumb: "Deblocage du credit" },
    onsultationVirementPermanent: { url: 'consultation-virement-permanent', breadcumb: "Consultation des virements permanents" },
    gestionAbandonInteretRetard: { url: 'gestion-abandon-interet-retard', breadcumb: "Gestion de l'abandon de l'interet du retard" },
    prorogationDeblocage: { url: 'prorogation-deblocage', breadcumb: "Prorogation du deblocage" },
    remboursementAnticipe: { url: 'remboursement-anticipe', breadcumb: "Remboursement anticipe" },
    remboursementEcheance: { url: 'remboursement-echeance', breadcumb: "Remboursement echeance" },
    authorisationDiscovery: { url: 'authorisation-discovery', breadcumb: "Authorisation de decouverte" },
    raiseDiscovery: { url: 'raise-discovery', breadcumb: "Levee de decouverte" },
    validateDiscovery: { url: 'validate-discovery', breadcumb: "Validation de decouverte" },

    validationDossier: { url: 'validation-dossier', breadcumb: "Validation Dossier" },
    decisionBanque: { url: 'decision-banque', breadcumb: "Decision Banque" },
    decisionMembre: { url: 'decision-membre', breadcumb: "Decision Membre" },
    validationDecouverte: { url: 'validation-decouverte', breadcumb: "Validation Decouverte" },
    autorisationDecouverte: { url: 'autorisation-decouverte', breadcumb: "Autorisation Decouverte" },
    leveeDecouverte: { url: 'levee-decouverte', breadcumb: "Levee Decouverte" },
    saisieDAT: { url: 'saisie-dat', breadcumb: "Saisie DAT" },
    saisieBC: { url: 'saisie-bc', breadcumb: "Saisie BC" },
    oppositionBC: { url: 'opposition-bc', breadcumb: "Opposition BC" },
    simulationBC: { url: 'simulation-bc', breadcumb: "Simulation BC" },
    refundBC: { url: 'refund-bc', breadcumb: "Remboursement BC" },
    createBC: { url: 'create-bc', breadcumb: "Mise en place d'un placement Bon de caisse" },
    updateBC: { url: 'update-bc/:numdossier/:mode', breadcumb: "Mise a jour d'un placement Bon de caisse" },
    createDAT: { url: 'create-dat', breadcumb: "Mise en place d'un placement Depot à terme" },
    updateDAT: { url: 'update-dat/:numdossier/:mode', breadcumb: "Mise a jour d'un placement Depot à terme" },
    simulationDAT: { url: 'simulation-dat', breadcumb: "Simulation DAT" },
    recoveryDAT: { url: 'recovery-dat', breadcumb: "Recouvrement DAT" },

    oppositionDAT: { url: 'opposition-dat', breadcumb: "Opposition DAT" },
    sessionComite: { url: 'session-comite', breadcumb: "Session Comite" },
    remboursementDAT: { url: 'remboursement-dat', breadcumb: "Remboursement DAT" },
    dossierCredit: { url: 'dossier-credit', breadcumb: "Dossier Credit" },
    createDiscovery: { url: 'creation-decouvert', breadcumb: "Création Decouvert" },

    createDossierCredit: { url: 'create-dossier-credit', breadcumb: "Creation dossier credit" },
    consultDossierCredit: { url: 'create-dossier-credit:/code', breadcumb: "Consultation dossier credit" },
    createSessionComite: { url: 'create-session-comite', breadcumb: "Creation session comite" },
    createAbandonInteretCredit: { url: 'create-abandon-interet-dossier-credit', breadcumb: "Creation Abandon interet credit" },
    balance: { url: 'balance', breadcumb: "Balance" },
    bigBook: { url: 'big-book-repost', breadcumb: "Grand Livre" },
    accountHistoryReport: { url: 'account-history', breadcumb: "Historique des comptes" },
    memberSlip: { url: 'members-slip', breadcumb: "Fiche membres" },
    stateParametersManagement: { url: 'state-parameters-management', breadcumb: "Paramétrage des états" },
    usersPerGroupe: { url: 'users-per-groupe', breadcumb: "Utilisateurs par groupe" },
    statesLauncher: { url: 'states-launcher', breadcumb: "Lanceurs d'états" },
    shutdownJournal: { url: 'shutdown-journal', breadcumb: "Journal arrete" },
    treatmentReport: { url: 'treatment-report', breadcumb: "Rapport traitement" },
    batchJournal: { url: 'batch-journal', breadcumb: "Journal des lots" },
    cashierJournal: { url: 'cashier-journal', breadcumb: "Journal caisse" },
    transcripGenerationMonth: { url: 'transcript-generation-month', breadcumb: "Génération relevé - Mensuelle" },
    transcripGenerationSemenster: { url: 'transcript-generation-semester', breadcumb: "Génération relevé - Semestriele" },
    transcripGenerationYear: { url: 'transcript-generation-year', breadcumb: "Génération relevé - Annuel" },
    declarationType: { url: 'declaration-type', breadcumb: "Type de declarations" },
    managementSlipDeclation: { url: 'management-slip-declaration', breadcumb: "Gestion des feuillets de declarations" },
    valorisingPostAccount: { url: 'valorising-post-account', breadcumb: "Valorisation des postes comptable" },
    coherenceControle: { url: 'coherence-controle', breadcumb: "Controle Coherence" },
    postCorrections: { url: 'post-corrections', breadcumb: "Correction des postes" },
    reportPrinting: { url: 'report-printing', breadcumb: "Impression rapport" },
    closePeriod: { url: 'close-period', breadcumb: "Cloturer période" },
    newStatementConfig: { url: 'new-statement-config', breadcumb: "Nouveau paramétrage des états" },
    newSlipDeclaration: { url: 'new-slip-declaration', breadcumb: "Nouveau feuillet" },
    newDeclarationType: { url: 'new-declaration-type', breadcumb: "Nouveau type de declaration" },
    tableauAmortissement: { url: 'tableau-amortissement/:code', breadcumb: "Tableau d'amortissement" },
    tableauAmortissementCM: { url: 'tableau-amortissement-cm/:code', breadcumb: "Tableau d'amortissement CM" },
    modifsObjetFinancier: { url: 'modif-objecFinancier/:code', breadcumb: "modifications de l'objet financier" },
    detailsEcheance: { url: 'details-echeances', breadcumb: "Détails de l'échéance" },
    addCustomerCheckbook: { url: 'add-customer-checkbook', breadcumb: "Ajouter une demande de chequier" },
    updateCustomerCheckbook: { url: 'update-customer-checkbook/:code/:mode', breadcumb: "Mise a jour d'une demande de chequier" },
    addRemiseChequeBook: { url: 'add-remise-checkbook', breadcumb: "Ajouter une remise chequier" },
    updateRemiseChequeBook: { url: 'update-remise-checkbook/:code/:mode', breadcumb: "Mise a jour d'une remise chequer" },
    personalisationChequeBook: { url: 'personalisation-checkbook/:code', breadcumb: "Personalisaiton chequier" },
    customerCheckbookRequesView: { url: 'customer-checkbook-request-view', breadcumb: "Remise chèquier clientèle" },
    internalCheckbookRequestView: { url: 'internal-checkbook-request-view', breadcumb: "Ajout demande chèquier interne" },
    addInternalCustomerCheckbook: { url: 'add-internal-checkbook', breadcumb: "Ajout demande chèquier interne" },
    personalisationInternalCustomerCheckbook: { url: 'personalisation-internal-checkbook/:code', breadcumb: "Personalisation demande chèquier interne" },
    internalCheckbookRemittance: { url: 'internal-checkbook-remittance', breadcumb: "Mise a jour d'une remise chequier interne" },
    ajouterCollecteJournaliere: { url: 'ajout-collecte-journaliere', breadcumb: "Ajouer collecte journaliere" },
    validateCollecteJournaliere: { url: 'valider-collecte-journaliere', breadcumb: "Valider collecte journaliere" },
    impressionRIB: { url: 'print-rib', breadcumb: "Impression RIB" },
    changementGestionnaire: { url: 'change-gestionnaire', breadcumb: "Changement gestionnaire" },
    updateDefaultParam: { url: 'update-default-params', breadcumb: "Modification paramètres par defaut" },
    updatePass: { url: 'update-pass', breadcumb: "Modifier son mote de passe" },
    sendMessage: { url: 'send-message', breadcumb: "Envoyer un message" },
    closeSessions: { url: 'close-session', breadcumb: "Cloturer des session ouvertes" },


  },
  group: {
    code: '00001',
    libelle: 'Groupe Muffa'
  },
  devise: {
    code: '',
    libelle: 'XAF'
  },
  module: {
    moral: '/moral',
    physical: '/physical',
    account: '/compte',
    adhesion: '/adhesion'
  },
  api: {
    logUser: "/login",
    physicalCustomerList: "/api/clients/physique/list",
    physicalCustomerPage: "/api/clients/physique/page",
    moralCustomerList: "/api/clients/morale/list",
    moralCustomerPost: "/api/clients/morale/create",
    moralCustomerPage: "/api/clients/morale/page",
    physicCustomerPost: "/api/clients/physique/create",
    uniteBancaireList: "/api/general/list/uniteBancaire",
    urlTypePiece: "/api/general/find/type_piece",
    urlchapitreList: "/api/general/list/chapitre",
    agenceList: "/api/general/list/agence",
    formeJuridiqueList: "/api/general/find/forme_juridique",
    paysList: "/api/general/list/pays",
    secteurActivite: "/api/general/find/secteur_activite",
    agentEconomique: "/api/general/list/agentEconomique",
    nationalite: "/api/general/find/nationalite",
    civiliteList: "/api/general/find/civilite",
    professionList: "/api/general/find/profession",
    typePieceList: "/api/general/find/type_piece",
    provinceList: "/api/general/find/province",
    districtList: "/api/general/find/district",
    typeEntrepriseList: "/api/general/find/typeEntreprise",
    statutEntrepriseList: "/api/general/find/statut_entreprise",
    gestionnaireList: "/api/general/find/gestionnaire/",
    groupeClientList: "/api/general/find/groupe_clients/",
    familleClientList: "/api/general/find/famille_clients/",
    natureClientList: "/api/general/find/nature_client",
    qualiteList: "/api/general/find/qualite",
    villeList: "/api/general/find/ville",
    categorieInterneList: "/api/general/find/categorie_interne",
    utilisateurList: "/api/general/list/utilisateur",
    profilClientList: "/api/general/find/profil_client",
    regimeBienList: "/api/general/find/regime_biens",
    statutMatrimoniale: "/api/general/find/statut_matrimonial",
    plageRevenue: "/api/general/find/plage_revenu",
    findPersonne: "/api/general/find/personne",
    createPersonne: "/api/general/create/personne",
    deletePersonne: "/api/general/delete/personne",
    updatePersonne: "/api/general/update/personne",
    updateClientMorale: "/api/clients/morale/update",
    accountManagerList: "/api/gestionnaire/find",
    changeGestionnaire: "/api/gestionnaire/changeGestionnaire",
    accountManagerPage: "/api/gestionnaire/page",
    accountManagerCreate: "/api/gestionnaire/create",
    accountManagerModify: "/api/gestionnaire/update",
    accountManagerDelete: "/api/gestionnaire/delete",
    findGestionnaireHistory: "/api/gestionnaire/findGestionnaireHistory",
    findHistory: "/api/gestionnaire/findHistory",
    typeCompteList: "/api/compte/typeCompte/list",
    typeOperationList: "/api/gestionnaire/typeOperation/list",
    accountList: "/api/compte/find",
    accountPage: "/api/compte/page",
    doCaissePage: "/ope/caisse/caissePage",
    urlProduitList: "/api/general/list/produits",
    urlDeviseList: "/api/general/list/devise",
    reservationAccountPage: "/api/compte/reservation/page",
    accountPositionHistory: "/api/compte/position/findHistorique",
    miseEnPlaceReservation: "/api/compte/miseEnPlaceReservation",
    leveeReservation: "/api/compte/leveeReservation",
    accountHistory: "/api/compte/findHistorique",
    fermetureComptePage: "/api/compte/fermeture/page",
    fermetureCompte: "/api/compte/fermeture",
    deviseList: "/api/general/list/devise",
    oppositionPage: "/api/compte/opposition/page",
    oppositionClientsPage: "/api/clients/opposition/page",
    miseEnPlaceOppositionCompte: "/api/compte/opposition/create",
    miseEnPlaceOppositionClient: "/api/clients/opposition/create",
    decedeClientPage: "/api/clients/decede/page",
    decedeClientCreate: "/api/clients/decede/create",
    decedeCientUpdate: "/api/clients/decede/update",
    decedeClientValidate: "/api/clients/decede/valider",
    leveeOppositionCompte: "/api/compte/opposition/levee",
    leveeOppositionClient: "/api/clients/opposition/levee",
    deleteClientPhysique: "/api/clients/physique/delete",
    deleteClientMorale: "/api/clients/morale/delete",
    compteSansMouvementPage: "/api/compte/findCompteSansMouvement",
    typeOppositionList: "/api/compte/listTypeOpposition/",
    partSocialParams: "/api/partSociale/parametreMicrofi/list",
    partSocialeRemboursement: "/api/partSociale/remboursement",
    CheckAdherant: "/api/partSociale/adherant/get",
    partSocialeAugmentationFond: "/api/partSociale/fondSolidarite/augmentation",
    partSocialeAdhesionMembre: "/api/partSociale/adhesionMembre",
    partSocialeSouscription: "/api/partSociale/souscription",
    pagePartSocial: "/api/partSociale/pagePartSocial",
    pageCessionParts: "/api/partSociale/pageCessionParts",
    doDecisionClientAvisCessionParts: "/api/partSociale/avisCession/decisionClient",
    doValiderAvisCessionParts: "/api/partSociale/avisCession/valider",
    doAnnulerAvisCessionParts: "/api/partSociale/avisCession/annuler",
    collecteurList: "/ope/collecte/list",
    collecteJourParams: "/ope/collecte/dofindParametreCollecte",
    collecteCollection: "/ope/collecte/dofindCollecteJournaliere",
    collectePage: "/ope/collecte/page",
    collecteArretePage: "/ope/collecte/dofindArreteCollecte",
    doarreteCollecte: "/ope/collecte/doarreteCollecte",
    dovalidatearreteCollecte: "/ope/collecte/dovaliderArreteCollecte",
    taxeFraisFixe: "/ope/collecte/taxeFraisFixe",
    collecteParametreSave: "/ope/collecte/dosaveParametreCollecte",
    collecteVirementMultiple: "/ope/collecte/virementMultiple",
    caisseOuverture: "/ope/caisse/ouverture",
    caisseReouverture: "/ope/caisse/reouverture",
    caissePrincipaleApprovisionnementCreate: "/ope/caisse/principale/approvisionnement/create",
    caissePrincipaleApprovisionnementUpdate: "/ope/caisse/principale/approvisionnement/update",
    caisseTransfertIntercaisseCreate: "/ope/caisse/transfert/interCaisse/create",
    caisseTransfertIntercaisseUpdate: "/ope/caisse/transfert/interCaisse/update",
    caisseReceptionTransfertIntercaisseCreate: "/ope/caisse/reception/transfert/interCaisse/create",
    caisseAjustage: "/ope/caisse/ajuster",
    caisseFermeture: "/ope/caisse/fermer",
    CaisseForcage: "/ope/caisse/forcer",
    caissePage: "/ope/caisse/page",
    doAjusterCaisse: "/ope/caisse/ajusterCaisse",
    partSocialeParamsByCode: "/api/partSociale/parametreMicrofi/get",
    createCession: "/api/partSociale/avisCession/create",
    partSocialeCessionListe: "/api/partSociale/page",
    generateAccountNumber: "/api/compte/numero/generer",
    createAccount: "/api/compte/create/",
    updateAccount: "/api/compte/update",
    customerPage: "/api/clients/page",
    doCreateVirement: "/ope/virement/create",
    docreateVirementPermanent: "/ope/virement/permanent/create",
    doOppositionAccounttPage: "/api/compte/opposition/page",
    doisChequeBanque: "/ope/cheque/doisChequeBanque",
    doisChequeOpposition: "/cheque/doisChequeOpposition",
    doisChequeRemis: "/cheque/doisChequeRemis",
    doisChequeBanqueEmis: "/cheque/doisChequeBanqueEmis",
    calculerCommission: "/api/commission/calculer",
    dofindTypeCaisse: "/caisse/dofindTypeCaisse",
    dogetCoupure: "/ope/caisse/coupure",
    doGetNature: "/ope/caisse/getNature",
    caisseEtat: "/ope/caisse/etat",
    doTypePaiement: "/ope/caisse/typePaiement",
    dogetParametreTransfert: "/ope/caisse/getParametreTransfert",
    doGetTransfert: "/ope/caisse/transfert",
    doGetCaisse: "/ope/caisse/user",
    doGetSecondaireCaisse: "/ope/caisse/caisseSecondaire",
    doGetPrincipaleCaisse: "/ope/caisse/caisseSecondaire",
    doOuvrirCaisse: "/ope/caisse/ouvrirCaisse",
    provenance: "/ope/caisse/provenance",
    destination: "/ope/caisse/getDestination",
    doGetBanque: "/ope/virement/banque",
    dosortieFond: "/ope/caisse/sortieFond",
    dotransfertInterCaisseBilletagePS: "/ope/caisse/transfertInterCaisseBilletagePS",
    dotransfertInterCaisseBilletageSP: "/ope/caisse/transfertInterCaisseBilletageSP",
    dotransfertInterCaissePS: "/ope/caisse/transfertInterCaissePS",
    doFermerCaisse: "/ope/caisse/fermerCaisse",
    dotransfertInterCaisseSP: "/ope/caisse/transfertInterCaisseSP",
    mode: "/caisse/mode",
    creationDecouvert: "/eng/decouvert/autoriser",
    doversement: "/ope/caisse/versement",
    doFindTypeDecouverte: "/eng/placement/typesDecouvert",
    listDecouvert: "/eng/engagement/list",
    findDecouvert: "/eng/decouvert/list",
    dofindCheque: "/ope/cheque/dofindCheque",
    dofindDecouvert: "/eng/engagement/decouvert",
    dofindOneDecouvert: "/eng/engagement/findOneDecouvert",
    validerDecouvert: "/eng/decouvert/validation",
    dofindTypeDePlacement: "/eng/placement/placement",
    listGarantie: "/eng/engagement/dofindListGarantie",
    leveeDecouvert: "/eng/decouvert/levee",
    deleteDecouvert: "/eng/decouvert/deleteDecouvert",
    typePlacements: "/eng/placement/placement",
    docreateDiscovery: '/eng/raise-discovery',
    saisieBC: "/eng/",
    dosaveSimulationPlacem: "/eng/placement/saveSimulationPlacem",
    simulationPlacem: "/eng/placement/simulationPlacem",
    doretrait: "/ope/caisse/retrait",
    dopaiement: "/ope/caisse/paimentParCaisse",
    doabandonDossierCredit: "/eng/tresorerie/abandonnerDossierCredit",
    docreateSessionComite: "/engagement/docreateSessionComite",
    doavenantDossierCredit: "/eng/tresorerie/avenantDossierCredit",
    doabandonnerInteretRetard: "/eng/tresorerie/abandonnerInteretRetard",
    doabandonnerDossierCredit: "/eng/tresorerie/abandonnerDossierCredit",


    findSimulationTableau: "/eng/tresorerie/findSimulationTableau",
    findSimulationCreditTableau: "/eng/tresorerie/findSimulationCreditTableau",
    findSessionCommite: "/eng/tresorerie/findSessionCommite",
    dossierCredit: "/eng/tresorerie/dossierCredit",
    sessionComite: "/eng/tresorerie/sessionComite",
    decisionDossierCredit: "/eng/tresorerie/decisionDossierCredit",
    validationDossierCredit: "/eng/tresorerie/validationDossierCredit",
    deblocageDossierCredit: "/eng/tresorerie/deblocageDossierCredit",
    remboursementAnticipe: "/eng/tresorerie/remboursementAnticipe",
    remboursementEcheance: "/eng/tresorerie/remboursementEcheance",
    findAbandonInteretRetard: "/eng/tresorerie/findAbandonInteretRetard",
    getTypeTiers: "/eng/tresorerie/typeTiers",
    getmodePlanLibres: "/eng/tresorerie/modePlanLibres",
    getperiodicites: "/eng/tresorerie/periodicites",
    gettypePlans: "/eng/tresorerie/typePlans",
    gettypeParamTauxs: "/eng/tresorerie/typeParamTauxs",
    gettypeTauxs: "/eng/tresorerie/typeTauxs",
    getmodeGestDiffs: "/eng/tresorerie/modeGestDiffs",
    getetatDossierCreds: "/eng/tresorerie/etatDossierCreds",
    getdecisionDossiers: "/eng/tresorerie/decisionDossiers",
    getmodeDeblocages: "/eng/tresorerie/modeDeblocages",
    getmodeRemboursements: "/eng/tresorerie/modeRemboursements",
    getetatSimulations: "/eng/tresorerie/etatSimulations",
    getmodeRegenerations: "/eng/tresorerie/modeRegenerations",
    gettermeCredits: "/eng/tresorerie/termeCredits",
    getmodeRecouvImpayes: "/eng/tresorerie/modeRecouvImpayes",
    getetatAbandonInterets: "/eng/tresorerie/etatAbandonInterets",
    getetatSourceFinancements: "/eng/tresorerie/etatSourceFinancements",
    getoptionApurement: "/eng/tresorerie/optionApurement",
    findDossierCredit: "/eng/tresorerie/findDossierCredit",
    dofindPlacements: "/eng/placement/dofindPlacements",
    docreatePlacement: "/eng/placement/docreatePlacement",
    dofindEcheance: "/eng/placement/dofindEcheance",
    nantirPlacement: "/eng/placement/nantirPlacem",
    leverNantirPlacement: "/eng/placement/dolevernantirPlacement",
    dofindPlacement: "/eng/placement/dofindPlacement",
    doSaisirOpposition: "/eng/placement/doOppositionPlacemBC",
    doSairRemboursementPlacement: "/eng/placement/doRemboursementPlacemBC",
    etatPlacement: "/eng/placement/etatPlacement",
    etatDecouvert: "/eng/placement/etatDecouvert",
    validerSimuationDossierCredit: "/eng/tresorerie/validerSimuationDossierCredit",
    annulerSimulationDossierCredit: "/eng/tresorerie/annulerSimulationDossierCredit",
    printBilletSimulationDossierCredit: "/eng/tresorerie/printBilletSimulationDossierCredit",
    printSimulationDossierCredit: "/eng/tresorerie/printSimulationDossierCredit",
    deleteSessionComite: "/eng/tresorerie/deleteSessionComite",
    updateAbandonnerInteretRetard: "/eng/tresorerie/updateAbandonnerInteretRetard",
    tableauAmortissementDossierCredit: "/eng/tresorerie/tableauAmortissementDossierCredit",
    tableauAmortissementCMDossierCredit: "/eng/tresorerie/tableauAmortissementCMDossierCredit",
    simulationDossierCredit: "/eng/tresorerie/simulationDossierCredit",
    reportSessionComite: "/eng/tresorerie/reportSessionComite",
    prorogationEcheance: "/eng/tresorerie/prorogationEcheance",
    findComiteCredit: "/eng/tresorerie/findComiteCredit",
    doapurerDossierCredit: "/eng/tresorerie/doapurerDossierCredit",
    typesCredit: "/eng/tresorerie/typesCredit/00001",
    etatSession: "/eng/tresorerie/etatSession",
    destinationPlacem: "/eng/placement/destination",
    modeRenouvellement: "/eng/placement/modeRenouvellement",
    findGestionnaire: "/eng/placement/findGestionnaire",
    genererTableauAmortissement: "/eng/tresorerie/genererTableauAmortissement",
    sourceFinancement: "/eng/tresorerie/sourceFinancement/0001",
    apporteurAffaire: "/eng/tresorerie/apporteurAffaire/0001",
    secteurActiviteCredit: "/eng/tresorerie/secteurActivite/0001",
    objetFinancement: "/eng/tresorerie/objetFinancement/0001",
    tauxReference: "/eng/tresorerie/tauxReference/0001",
    echeancesDetails: "/eng/tresorerie/echeancesDetails",
    findDeblocageCredit: "/eng/tresorerie/findDeblocageCredit",
    membresComite: "/eng/tresorerie/membresComite",
    comiteCredit: "/eng/tresorerie/comiteCredit/0001",
    getDossierComite: "/eng/tresorerie/getDossierComite",
    doGetPeriodicitesVirementUrl: "/ope/virement/periodicite",
    doSaisirLeveeOpposition: "/eng/engagement/dosaisirLeveeOppositionBC",
    doGetDestinationVirementUrl: "/ope/virement/destination",
    dofindEtatPlacement: "",
    urlTypevirement: "/ope/virement/type",
    urlVirementMultipleCreate: "/ope/virement/mutilple/create",
    typeFichiers: "/ope/virement/typeFichier",
    doretraitBilletage: "/ope//caisse/retrait/billetage",
    doretraitRappel: "/ope/caisse/retrait/rappel",
    doversementRappel: "/ope/caisse/versement/rappel",


    createBalance: "/api/balance/balance",
    createBalanceBuild: "/api/balance/build",
    getPlanCompte: "/api/balance/planCompte",
    getBalanceType: "/api/balance/type",
    // dofindOrganisme :"/ope/caisse/findOrganisme",
    dofindDemandeChequier: "/ope/cheque/dofindDemandeChequier",
    dofindTypeChequier: "/ope/cheque/dofindTypeChequier",
    dofindChequier: "/ope/cheque/dofindChequier",
    doSaveChequier: "/ope/cheque/doSaveChequier",
    personnalisationDemandeChequier: "/ope/cheque/personnalisationDemandeChequier",
    doSaveCheque: "/ope/cheque/doSaveCheque",
    saveDemandeChequier: "/ope/cheque/saveDemandeChequier",
    ficheMembre: "/api/balance/ficheMembre",
    clientsList: "/api/clients/list",
    type_piece: "/api/general/find/type_piece",
    listAgences: "/api/general/list/agence",
    balanceBuild: "/api/balance/build",
    findCaisse: "/ope/caisse/findCaisse",
    journalCaisse: "/api/balance/journalCaisse",
    findArreteCompte: "/api/balance/arreteCompte",
    grandLivre: "/api/balance/grandLivre",
    historiqueBalance: "/api/balance/historique",
    dofindChequeAutreBanque: "/ope/cheque/dofindChequeAutreBanque",
    urlGestionVirementPermanent: "/ope/virement/permanent/page",
    dofindPartenaire: "/ope/virement/partenaires",
    findPartenaire: "/ope/virement/partenaires",
    doCreateVirementSpecifique: "/ope/virement/specifique",
    doAchatMpsUrl: "/ope/caisse/achatMps",
    doVenteMpsUrl: "/ope/caisse/venteMps",
    dofindOrganisme: "/ope/caisse/findOrganisme",
    doCreateEnvoieFonds: "/ope/caisse/envoiFond",
    doConvertiMontantx: "/ope/caisse/convertiMontant/",
    doReceptionFond: "/ope/caisse/receptionFond",
    doVersementSpecifique: "/ope/caisse/versementSpecifique",
    doVersementSpecifiqueBilletage: "/ope/caisse/versementSpecifique/billetage",
    doFindClientPost: "/api/clients/physique/find",
    saveSortChequeInterAgence: "/ope/cheque/saveSortChequeInterAgence",
    saveSortChequeInterBanque: "/ope/cheque/saveSortChequeInterBanque",
    saveChequeRecusCompensation: "/ope/cheque/saveChequeRecusCompensation",
    findbanquCheque: "/ope/virement/banque/page",
    doreceptionFond: "/ope/caisse/receptionFond",
    doreceptionFondBilletage: "/ope/caisse/receptionFondBilletage",
    doparamBiometrieByCode: "/api/biometrie/paramBiometrieByCode",
    doValidateCompte: "/api/compte/compte/validation",
    impressionRIB: "/api/compte/impressionRIB",
  }
};

environment.serverUrl = `${environment.baseApiUrl}${environment.apiProvider}${environment.apiVersion}`;
environment.oauth.serverUrl = `${environment.baseApiUrl}${environment.apiProvider}`;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
