import { ITreeView } from "../CategoriesTags"

export enum EnumType {
  TYPE_DEFAULT = 0,
  TYPE_TREEVIEW = 1,
}

// TODO ProfileAvatar data. Update in FB-27
export const dataProfileAvatar = {
    name: 'Up Bank',
    avatar: 'https://www.upsieutoc.com/images/2021/01/29/upbank.png',
    status: 1,
    rating: 4.5,
    decs: 'Up is a mobile-only digital bank, providing customers with a mobile app, debit card, and digital wallets linked to real bank accounts...',
  }
  
  function createDataTopCompanies(name: string, total: string) {
    return { name, total }
  }
  
  // TODO TopCompanies data. Update in FB-27
export const dataTopCompanies = [
    createDataTopCompanies('Volt', '$78.5M'),
    createDataTopCompanies('86400', '$25M'),
    createDataTopCompanies('Xinja', '$150M'),
    createDataTopCompanies('Hay', '$7.3M'),
    createDataTopCompanies('Judo', '$1.5B'),
    createDataTopCompanies('Revolut', '$917M'),
    createDataTopCompanies('Douugh', '$2.5M'),
    createDataTopCompanies('Tyro', '$103.9M'),
    createDataTopCompanies('Monzo', '$461.3M'),
    createDataTopCompanies('N26', '$782.8M'),
  ]
  
  // TODO CompanyInformation data. Update in FB-27
  export const dataCompanyInformation = {
    launchDay: 'Jan 2017',
    ownership: 'Private',
    valuation: '',
    employees: '70 FTEs (Sep 2020)',
    website: 'up.com.au',
    socials: 'Twitter, Instagram, Linkedin',
    address: 'South Melbourne, Victoria, Australia',
  }
  
  function createCategoriesTags(name: string, type: EnumType, value: string|ITreeView) {
    return { name, type, value }
  }
  
  // TODO CategoriesTags data. Update in FB-27
  export const dataCategoriesTags = [
    createCategoriesTags('Eco-system', EnumType.TYPE_TREEVIEW, 
      {
        id: 0,
        name: 'Retail Banking',
        children: [
          {
            id: 1,
            name: 'Retail Accounts',
            children: [
              {
                id: 2,
                name: 'Digital Challenger Banks',
                children: [
                  {
                    id: 3,
                    name: 'Neobanks',
                    children: null
                  },
                ],
              },
            ],
          },
        ],
      },
    ),
    createCategoriesTags('Industry', EnumType.TYPE_DEFAULT, 'Partnership'),
    createCategoriesTags('Capital Markets Value Chain', EnumType.TYPE_DEFAULT, ''),
    createCategoriesTags('Fintech Type', EnumType.TYPE_DEFAULT, 'Disruptor'),
  ]