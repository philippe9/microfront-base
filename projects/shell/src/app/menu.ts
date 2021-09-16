// import { environment } from '../environments/environment.prod';
// import { environment } from '';

import { environment } from "projects/shared-lib/src/environments/environment.prod";

export const MICROFI_MENU = [
  {
    breadcumb: "FICHIER",
    subMenu: [
      {
        "url": "update-default-params",
        "breadcumb": "Modification paramètres par defaut",
        "code": 6,
        "subMenu": []
      }, {
        "url": "update-pass",
        "breadcumb": "Modifier son mot de passe",
        "code": 8,
        "subMenu": []
      }, {
        "url": "send-message",
        "breadcumb": "Envoyer un message",
        "code": 12,
        "subMenu": []
      }, {
        "url": "close-session",
        "breadcumb": "Cloturer des session ouvertes",
        "code": 13,
        "subMenu": []
      }, {
        "url": "",
        "breadcumb": "Reconnexion",
        "code": 999,
        "subMenu": []
      }
    ],
    code: 0,
    url: ''
  },
  // {
  //   breadcumb: "COMPTABILISATION",
  //   subMenu: [
  //     {
  //       "url": "compte-general",
  //       "breadcumb": "Compte general",
  //       "code": 6,
  //       "subMenu": []
  //     }, {
  //       "url": "compte-clientele-interne",
  //       "breadcumb": "Compte clientele interne",
  //       "code": 8,
  //       "subMenu": []
  //     },{
  //       "url": "historique-compta",
  //       "breadcumb": "Historique",
  //       "code": 8,
  //       "subMenu": []
  //     },{
  //       "url": "",
  //       "breadcumb": "Generation auto compte",
  //       "code": 11,
  //       "subMenu": [
  //         {
  //           "url": "compte-general-compta",
  //           "breadcumb": "General",
  //           "code": 11,
  //           "subMenu": []
  //         }, {
  //           "url": "compte-typegarantie-compta",
  //           "breadcumb": "Impression RIB",
  //           "code": 11,
  //           "subMenu": []
  //         }, {
  //           "url": "account-postion",
  //           "breadcumb": "Position de compte",
  //           "code": 11,
  //           "subMenu": []
  //         }, {
  //           "url": "account-reservation",
  //           "breadcumb": "Reservation",
  //           "code": 11,
  //           "subMenu": []
  //         }, {
  //           "url": "sleeper-account",
  //           "breadcumb": "Gestion des comptes dormants",
  //           "code": 11,
  //           "subMenu": []
  //         }, {
  //           "url": "account-opposition",
  //           "breadcumb": "Opposition Compte",
  //           "code": 11,
  //           "subMenu": []
  //         }, {
  //           "url": "closed-account",
  //           "breadcumb": "Fermeture de compte",
  //           "code": 11,
  //           "subMenu": []
  //         },
  //       ]
  //     }, {
  //       "url": "sleeper-account",
  //       "breadcumb": "Gestion des comptes dormants",
  //       "code": 12,
  //       "subMenu": []
  //     }, {
  //       "url": "customer-opposition",
  //       "breadcumb": "Gestion des oppositions clients",
  //       "code": 13,
  //       "subMenu": []
  //     }, {
  //       "url": "dead-customer",
  //       "breadcumb": "Gestion des clients decedes",
  //       "code": 13,
  //       "subMenu": []
  //     }, {
  //       "url": "",
  //       "breadcumb": "Gestion des gestionnaires",
  //       "code": 13,
  //       "subMenu": [
  //         {
  //           "url": "account-manager",
  //           "breadcumb": "Gestionnaire",
  //           "code": 13,
  //           "subMenu": []
  //         },
  //         {
  //           "url": "change-gestionnaire",
  //           "breadcumb": "Changement gestionnaire",
  //           "code": 13,
  //           "subMenu": []
  //         },
  //         {
  //           "url": "account-manager-history",
  //           "breadcumb": "Historique gestionnaire",
  //           "code": 13,
  //           "subMenu": []
  //         }
  //       ]
  //     },
  //   ],
  //   code: 1,
  //   url: ''
  // },


  {
    breadcumb: "CUSTOMER MGMT",
    subMenu: [
      {
        "url": "customer/physic-list",
        "breadcumb": "Personnes Phyisques",
        "code": 6,
        "subMenu": []
      }, {
        "url": "customer/moral-list",
        "breadcumb": "Personne morale",
        "code": 8,
        "subMenu": []
      }, {
        "url": "",
        "breadcumb": "Account Management",
        "code": 11,
        "subMenu": [
          {
            "url": "account/account",
            "breadcumb": "Compte",
            "code": 11,
            "subMenu": []
          }, {
            "url": "account/print-rib",
            "breadcumb": "Impression RIB",
            "code": 11,
            "subMenu": []
          }, {
            "url": "account/account-postion",
            "breadcumb": "Position de compte",
            "code": 11,
            "subMenu": []
          }, {
            "url": "account/account-reservation",
            "breadcumb": "Reservation",
            "code": 11,
            "subMenu": []
          }, {
            "url": "account/sleeper-account",
            "breadcumb": "Gestion des comptes dormants",
            "code": 11,
            "subMenu": []
          }, {
            "url": "account/account-opposition",
            "breadcumb": "Opposition Compte",
            "code": 11,
            "subMenu": []
          }, {
            "url": "account/closed-account",
            "breadcumb": "Fermeture de compte",
            "code": 11,
            "subMenu": []
          },
        ]
      }, {
        "url": "account/sleeper-account",
        "breadcumb": "Gestion des comptes dormants",
        "code": 12,
        "subMenu": []
      }, {
        "url": "customer/customer-opposition",
        "breadcumb": "Gestion des oppositions clients",
        "code": 13,
        "subMenu": []
      }, {
        "url": "/customer/dead-customer",
        "breadcumb": "Gestion des clients decedes",
        "code": 13,
        "subMenu": []
      }, {
        "url": "",
        "breadcumb": "Gestion des gestionnaires",
        "code": 13,
        "subMenu": [
          {
            "url": "account-manager/account-manager",
            "breadcumb": "Gestionnaire",
            "code": 13,
            "subMenu": []
          },
          {
            "url": "account-manager/change-gestionnaire",
            "breadcumb": "Changement gestionnaire",
            "code": 13,
            "subMenu": []
          },
          {
            "url": "account-manager/account-manager-history",
            "breadcumb": "Historique gestionnaire",
            "code": 13,
            "subMenu": []
          }
        ]
      },
    ],
    code: 1,
    url: ''
  }, {
    breadcumb: "FRONT OFFICE",
    subMenu: [
      {
        breadcumb: 'Tenu de caise',
        code: 6,
        url: 'physicalCustomerList2',
        subMenu: [
          {
            breadcumb: 'Gestion de la caise',
            code: 6,
            url: 'physicalCustomerList2',
            subMenu: [
              {
                breadcumb: environment.routes.cashierOpening.breadcumb,
                code: 6,
                url: environment.routes.cashierOpening.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.cashierReopening.breadcumb,
                code: 6,
                url: environment.routes.cashierReopening.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.supplyMainCashier.breadcumb,
                code: 6,
                url: environment.routes.supplyMainCashier.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.cashoutMainCashier.breadcumb,
                code: 6,
                url: environment.routes.cashoutMainCashier.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.interCashierTransferSecondToMain.breadcumb,
                code: 6,
                url: environment.routes.interCashierTransferSecondToMain.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.interCashierTransferMainToSecond.breadcumb,
                code: 6,
                url: environment.routes.interCashierTransferMainToSecond.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.receiptInterCashierTransfer.breadcumb,
                code: 6,
                url: environment.routes.receiptInterCashierTransfer.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.cashierAutomaticAdjustment.breadcumb,
                code: 6,
                url: environment.routes.cashierAutomaticAdjustment.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.cashierAutomaticClosing.breadcumb,
                code: 6,
                url: environment.routes.cashierAutomaticClosing.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.cashierAdjustmentAndClosing.breadcumb,
                code: 6,
                url: environment.routes.cashierAdjustmentAndClosing.url,
                subMenu: []
              }, {
                breadcumb: environment.routes.cashierForcingAdjustment.breadcumb,
                code: 6,
                url: environment.routes.cashierForcingAdjustment.url,
                subMenu: []
              }
            ]
          }, {
            breadcumb: 'Versements',
            code: 6,
            url: 'physicalCustomerList2',
            subMenu: [{
              breadcumb: environment.routes.sameBranchDeposit.breadcumb,
              code: 6,
              url: environment.routes.sameBranchDeposit.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.specificDeposit.breadcumb,
              code: 6,
              url: environment.routes.specificDeposit.url,
              subMenu: []
            }]
          }, {
            breadcumb: 'Retraits',
            code: 6,
            url: 'physicalCustomerList2',
            subMenu: [{
              breadcumb: environment.routes.sameBranchWithdrawal.breadcumb,
              code: 6,
              url: environment.routes.sameBranchWithdrawal.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.cashierPayment.breadcumb,
              code: 6,
              url: environment.routes.cashierPayment.url,
              subMenu: []
            }]
          }, {
            breadcumb: 'Change espèce',
            code: 6,
            url: 'currency-change',
            subMenu: []
          }, {
            breadcumb: 'Transaction en devise',
            code: 6,
            url: 'physicalCustomerList2',
            subMenu: [{
              breadcumb: environment.routes.saleCurrency.breadcumb,
              code: 6,
              url: environment.routes.saleCurrency.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.buyCurrency.breadcumb,
              code: 6,
              url: environment.routes.buyCurrency.url,
              subMenu: []
            }]
          }, {
            breadcumb: 'Transaction sur MPS',
            code: 6,
            url: 'physicalCustomerList2',
            subMenu: [{
              breadcumb: environment.routes.saleMps.breadcumb,
              code: 6,
              url: environment.routes.saleMps.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.reimbursementMps.breadcumb,
              code: 6,
              url: environment.routes.reimbursementMps.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.recoveryMps.breadcumb,
              code: 6,
              url: environment.routes.recoveryMps.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.oppositionMps.breadcumb,
              code: 6,
              url: environment.routes.oppositionMps.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.cancelOppositionMps.breadcumb,
              code: 6,
              url: environment.routes.cancelOppositionMps.url,
              subMenu: []
            },
            ]
          }, {
            breadcumb: 'Transfert des fonds ',
            code: 6,
            url: 'physicalCustomerList2',
            subMenu: [{
              breadcumb: environment.routes.fundReception.breadcumb,
              code: 6,
              url: environment.routes.fundReception.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.fundTransfer.breadcumb,
              code: 6,
              url: environment.routes.fundTransfer.url,
              subMenu: []
            }]
          },
        ]
      },
      {
        breadcumb: 'Opérations sur les chèques et chequiers',
        code: 7,
        url: 'moralCustomerList2',
        subMenu: [{
          breadcumb: 'Gestion des chèques',
          code: 6,
          url: '',
          subMenu: [
            {
              breadcumb: environment.routes.issueChequeBank.breadcumb,
              code: 6,
              url: environment.routes.issueChequeBank.url,
              subMenu: []
            },
            {
              breadcumb: environment.routes.cancelChequeBank.breadcumb,
              code: 6,
              url: environment.routes.cancelChequeBank.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.certificationChequeBank.breadcumb,
              code: 6,
              url: environment.routes.certificationChequeBank.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.cancelCertificationCheque.breadcumb,
              code: 6,
              url: environment.routes.cancelCertificationCheque.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.cashierChequeRemittance.breadcumb,
              code: 6,
              url: environment.routes.cashierChequeRemittance.url,
              subMenu: []
            },
            // {
            //   breadcumb: environment.routes.chequeRemittanceSameBranch.breadcumb,
            //   code: 6,
            //   url: environment.routes.chequeRemittanceSameBranch.url,
            //   subMenu: []
            // }, {
            //   breadcumb: environment.routes.chequeRemittanceInterBranch.breadcumb,
            //   code: 6,
            //   url: environment.routes.chequeRemittanceInterBranch.url,
            //   subMenu: []
            // }, {
            //   breadcumb: environment.routes.chequeRemittanceInterBank.breadcumb,
            //   code: 6,
            //   url: environment.routes.chequeRemittanceInterBank.url,
            //   subMenu: []
            // },
            {
              breadcumb: environment.routes.chequeSpecificRemittance.breadcumb,
              code: 6,
              url: environment.routes.chequeSpecificRemittance.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.chequeArbitration.breadcumb,
              code: 6,
              url: environment.routes.chequeArbitration.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.chequeOpposition.breadcumb,
              code: 6,
              url: environment.routes.chequeOpposition.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.cancelChequeOpposition.breadcumb,
              code: 6,
              url: environment.routes.cancelChequeOpposition.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.consultationChequeOpposition.breadcumb,
              code: 6,
              url: environment.routes.consultationChequeOpposition.url,
              subMenu: []
            },
          ]
        },
        {
          breadcumb: 'Gestion des chéquiers',
          code: 6,
          url: '',
          subMenu: [
            {
              breadcumb: environment.routes.customerCheckbookRequestList.breadcumb,
              code: 6,
              url: environment.routes.customerCheckbookRequestList.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.customerChequeRemittance.breadcumb,
              code: 6,
              url: environment.routes.customerChequeRemittance.url,
              subMenu: []
            }, {
              breadcumb: environment.routes.internalCheckbookRequestList.breadcumb,
              code: 6,
              url: environment.routes.internalCheckbookRequestList.url,
              subMenu: []
            },
            {
              breadcumb: environment.routes.internalChequeRemittance.breadcumb,
              code: 6,
              url: environment.routes.internalChequeRemittance.url,
              subMenu: []
            },
          ]
        },
        {
          breadcumb: 'Sort des chèques',
          code: 6,
          url: '',
          subMenu: [{
            breadcumb: environment.routes.sortChequeInterBranch.breadcumb,
            code: 6,
            url: environment.routes.sortChequeInterBranch.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.sortChequeInterBank.breadcumb,
            code: 6,
            url: environment.routes.sortChequeInterBank.url,
            subMenu: []
          },]
        },
        {
          breadcumb: environment.routes.chequeFromCompensation.breadcumb,
          code: 6,
          url: environment.routes.chequeFromCompensation.url,
          subMenu: []
        },

        ]
      }, {
        breadcumb: 'Opérations de virement',
        code: 7,
        url: 'moralCustomerList2',
        subMenu: [
          {
            breadcumb: 'Virement simple',
            code: 7,
            url: 'moralCustomerList2',
            subMenu: [
              {
                breadcumb: environment.routes.simpleTransferOnCustomerAccount.breadcumb,
                code: 6,
                url: environment.routes.simpleTransferOnCustomerAccount.url,
                subMenu: []
              },
              {
                breadcumb: environment.routes.simpleTransferOnGeneralAccount.breadcumb,
                code: 6,
                url: environment.routes.simpleTransferOnGeneralAccount.url,
                subMenu: []
              },
            ]
          },
          {
            breadcumb: 'Virement permanent',
            code: 7,
            url: 'moralCustomerList2',
            subMenu: [
              {
                breadcumb: environment.routes.standingTransferOnCustomerAccount.breadcumb,
                code: 6,
                url: environment.routes.standingTransferOnCustomerAccount.url,
                subMenu: []
              },
              {
                breadcumb: environment.routes.standingTransferOnGeneralAccount.breadcumb,
                code: 6,
                url: environment.routes.standingTransferOnGeneralAccount.url,
                subMenu: []
              },
              {
                breadcumb: environment.routes.standingTransferManagement.breadcumb,
                code: 6,
                url: environment.routes.standingTransferManagement.url,
                subMenu: []
              },
            ]
          },
          {
            breadcumb: 'Virement multiple',
            code: 7,
            url: 'moralCustomerList2',
            subMenu: [
              {
                breadcumb: environment.routes.multiTransferSameBank.breadcumb,
                code: 6,
                url: environment.routes.multiTransferSameBank.url,
                subMenu: []
              },
            ]
          }, {
            breadcumb: environment.routes.specificTransfer.breadcumb,
            code: 6,
            url: environment.routes.specificTransfer.url,
            subMenu: []
          }
        ]
      }, {
        breadcumb: 'Gestion collecte journalière',
        code: 7,
        url: 'moralCustomerList2',
        subMenu: [
          {
            breadcumb: environment.routes.dailyCollectionEntry.breadcumb,
            code: 6,
            url: environment.routes.dailyCollectionEntry.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.dailyCollectionConsultation.breadcumb,
            code: 6,
            url: environment.routes.dailyCollectionConsultation.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.dailyCollectionStatement.breadcumb,
            code: 6,
            url: environment.routes.dailyCollectionStatement.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.dailyCollectionSetting.breadcumb,
            code: 6,
            url: environment.routes.dailyCollectionSetting.url,
            subMenu: []
          },
        ]
      },

    ],
    code: 2,
    url: ''
  }, {
    breadcumb: "SHARES MGMT",
    subMenu: [
      {
        breadcumb: environment.routes.shareSettings.breadcumb,
        code: 6,
        url: environment.routes.shareSettings.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.memberShipFees.breadcumb,
        code: 6,
        url: environment.routes.memberShipFees.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.subscriptionShares.breadcumb,
        code: 6,
        url: environment.routes.subscriptionShares.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.solidarityFundIncreasing.breadcumb,
        code: 6,
        url: environment.routes.solidarityFundIncreasing.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.reimboursementShare.breadcumb,
        code: 6,
        url: environment.routes.reimboursementShare.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.transfertShares.breadcumb,
        code: 6,
        url: environment.routes.transfertShares.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.membersShare.breadcumb,
        code: 6,
        url: environment.routes.membersShare.url,
        subMenu: []
      },
    ],
    code: 3,
    url: ''
  }, {
    breadcumb: "ENGAGEMENTS",
    subMenu: [
      {
        breadcumb: 'Bons de caisse',
        code: 6,
        url: '',
        subMenu: [{
          breadcumb: environment.routes.simulationBC.breadcumb,
          code: 6,
          url: environment.routes.simulationBC.url,
          subMenu: []
        }, {
          breadcumb: environment.routes.saisieBC.breadcumb,
          code: 6,
          url: environment.routes.saisieBC.url,
          subMenu: []
        }, {
          breadcumb: environment.routes.oppositionBC.breadcumb,
          code: 6,
          url: environment.routes.oppositionBC.url,
          subMenu: []
        }, {
          breadcumb: environment.routes.refundBC.breadcumb,
          code: 6,
          url: environment.routes.refundBC.url,
          subMenu: []
        },
        ]
      },
      {
        breadcumb: 'Dépôts à terme',
        code: 7,
        url: '',
        subMenu: [
          {
            breadcumb: environment.routes.simulationDAT.breadcumb,
            code: 6,
            url: environment.routes.simulationDAT.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.saisieDAT.breadcumb,
            code: 6,
            url: environment.routes.saisieDAT.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.oppositionDAT.breadcumb,
            code: 6,
            url: environment.routes.oppositionDAT.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.recoveryDAT.breadcumb,
            code: 6,
            url: environment.routes.recoveryDAT.url,
            subMenu: []
          },
        ]
      }, {
        breadcumb: 'Decouvert',
        code: 7,
        url: '',
        subMenu: [
          {
            breadcumb: environment.routes.authorisationDiscovery.breadcumb,
            code: 6,
            url: environment.routes.authorisationDiscovery.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.validateDiscovery.breadcumb,
            code: 6,
            url: environment.routes.validateDiscovery.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.raiseDiscovery.breadcumb,
            code: 6,
            url: environment.routes.raiseDiscovery.url,
            subMenu: []
          }
        ]
      }, {
        breadcumb: 'Crédits',
        code: 7,
        url: '',
        subMenu: [
          {
            breadcumb: environment.routes.simulatuionTableau.breadcumb,
            code: 6,
            url: environment.routes.simulatuionTableau.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.dossierCredit.breadcumb,
            code: 6,
            url: environment.routes.dossierCredit.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.sessionComite.breadcumb,
            code: 6,
            url: environment.routes.sessionComite.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.decisionBanque.breadcumb,
            code: 6,
            url: environment.routes.decisionBanque.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.decisionMembre.breadcumb,
            code: 6,
            url: environment.routes.decisionMembre.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.validationDossier.breadcumb,
            code: 6,
            url: environment.routes.validationDossier.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.deblocageTableau.breadcumb,
            code: 6,
            url: environment.routes.deblocageTableau.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.remboursementAnticipe.breadcumb,
            code: 6,
            url: environment.routes.remboursementAnticipe.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.remboursementEcheance.breadcumb,
            code: 6,
            url: environment.routes.remboursementEcheance.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.prorogationDeblocage.breadcumb,
            code: 6,
            url: environment.routes.prorogationDeblocage.url,
            subMenu: []
          },
          {
            breadcumb: environment.routes.gestionAbandonInteretRetard.breadcumb,
            code: 6,
            url: environment.routes.gestionAbandonInteretRetard.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.avenantDossierCredit.breadcumb,
            code: 6,
            url: environment.routes.avenantDossierCredit.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.abandonDossierCredit.breadcumb,
            code: 6,
            url: environment.routes.abandonDossierCredit.url,
            subMenu: []
          },
        ]
      },

    ],
    code: 4,
    url: ''
  }, {
    breadcumb: "RAPPORTS",
    subMenu: [
      {
        breadcumb: environment.routes.balance.breadcumb,
        code: 6,
        url: environment.routes.balance.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.bigBook.breadcumb,
        code: 6,
        url: environment.routes.bigBook.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.accountHistoryReport.breadcumb,
        code: 6,
        url: environment.routes.accountHistoryReport.url,
        subMenu: []
      },
      {
        breadcumb: environment.routes.memberSlip.breadcumb,
        code: 6,
        url: environment.routes.memberSlip.url,
        subMenu: []
      },
      {
        breadcumb: environment.routes.stateParametersManagement.breadcumb,
        code: 6,
        url: environment.routes.stateParametersManagement.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.usersPerGroupe.breadcumb,
        code: 6,
        url: environment.routes.usersPerGroupe.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.statesLauncher.breadcumb,
        code: 6,
        url: environment.routes.statesLauncher.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.shutdownJournal.breadcumb,
        code: 6,
        url: environment.routes.shutdownJournal.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.treatmentReport.breadcumb,
        code: 6,
        url: environment.routes.treatmentReport.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.batchJournal.breadcumb,
        code: 6,
        url: environment.routes.batchJournal.url,
        subMenu: []
      }, {
        breadcumb: environment.routes.cashierJournal.breadcumb,
        code: 6,
        url: environment.routes.cashierJournal.url,
        subMenu: []
      },
      {
        breadcumb: "Relevés de comptes",
        subMenu: [{
          breadcumb: environment.routes.transcripGenerationMonth.breadcumb,
          code: 6,
          url: environment.routes.transcripGenerationMonth.url,
          subMenu: []
        }, {
          breadcumb: environment.routes.transcripGenerationSemenster.breadcumb,
          code: 6,
          url: environment.routes.transcripGenerationSemenster.url,
          subMenu: []
        }, {
          breadcumb: environment.routes.transcripGenerationYear.breadcumb,
          code: 6,
          url: environment.routes.transcripGenerationYear.url,
          subMenu: []
        }],
        code: 5,
        url: ''
      },
      {
        breadcumb: "Déclarations",
        subMenu: [
          {
            breadcumb: environment.routes.declarationType.breadcumb,
            code: 6,
            url: environment.routes.declarationType.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.managementSlipDeclation.breadcumb,
            code: 6,
            url: environment.routes.managementSlipDeclation.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.valorisingPostAccount.breadcumb,
            code: 6,
            url: environment.routes.valorisingPostAccount.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.coherenceControle.breadcumb,
            code: 6,
            url: environment.routes.coherenceControle.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.postCorrections.breadcumb,
            code: 6,
            url: environment.routes.postCorrections.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.reportPrinting.breadcumb,
            code: 6,
            url: environment.routes.reportPrinting.url,
            subMenu: []
          }, {
            breadcumb: environment.routes.closePeriod.breadcumb,
            code: 6,
            url: environment.routes.closePeriod.url,
            subMenu: []
          }
        ],
        code: 5,
        url: ''
      }
    ],
    code: 5,
    url: ''
  },
]
