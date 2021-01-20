import capitalMarkets from "./images/bubble/capitalMarkets.svg"
import smeBanking from "./images/bubble/smeBanking.svg"
import insurance from "./images/bubble/insurance.svg"
import wealthManagement from "./images/bubble/wealthManagement.svg"
import corporateBanking from "./images/bubble/corporateBanking.svg"
import support from "./images/bubble/support.svg"
import technology from "./images/bubble/technology.svg"
import retailBanking from "./images/bubble/retailBanking.svg"
import lendingAndCrowdfunding from "./images/bubble/lendingAndCrowdfunding.svg"
import payments from "./images/bubble/payments.svg"
import retailAccounts from "./images/bubble/retailAccounts.svg"
import accountsAndSavings from "./images/bubble/accountsAndSavings.svg"
import financialBanking from "./images/bubble/financialBanking.svg"
import smeAccounting from "./images/bubble/smeAccounting.svg"
import digitalChallengerBanks from "./images/bubble/digitalChallengerBanks.svg"
import neobanks from "./images/bubble/neobanks.svg"
import challengerBanks from "./images/bubble/challengerBanks.svg"

export const tree = {
  name: "Business Line",
  children: [
    {
      name: "Capital Markets",
      size: 2548,
    },
    {
      name: "SME Banking",
      size: 3581,
    },
    {
      name: "Insurance",
      size: 2027,
    },
    {
      name: "Wealth Management",
      size: 1798,
    },
    {
      name: "Corporate Banking",
      size: 1124,
    },
    {
      name: "Support",
      size: 2799,
    },
    {
      name: "Technology",
      size: 4251,
    },
    {
      name: "Retail Banking",
      children: [
        {
          name: "Lending & Crowd...",
          children: [
            {
              name: "Consumer credit & loans",
              children: [
                {
                  name: "Auto loans",
                  size: 91,
                },
                {
                  name: "Home loans",
                  size: 237,
                },
                {
                  name: "Non-debt financing",
                  size: 296,
                },
                {
                  name: "Personal lines and loans",
                  size: 1032,
                },
                {
                  name: "Student loans",
                  size: 87,
                },
              ],
            },
            {
              name: "Lending infrastructure",
              children: [
                {
                  name: "Credit scoring & monitoring consumer",
                  size: 178,
                },
                {
                  name: "Product comparison",
                  size: 210,
                },
              ],
            },
          ],
        },
        {
          name: "Payments",
          children: [
            {
              name: "Digital retail payments",
              children: [
                {
                  name: "Bill payments",
                  size: 181,
                },
                {
                  name: "Mobile & digital wallets",
                  size: 563,
                },
                {
                  name: "Online payments",
                  size: 281,
                },
                {
                  name: "P2P payments",
                  size: 127,
                },
                {
                  name: "Prepaid payments",
                  size: 205,
                },
                {
                  name: "Remittance",
                  size: 323,
                },
                {
                  name: "Smart cards",
                  size: 59,
                },
                {
                  name: "Telecom payments",
                  size: 42,
                },
              ],
            },
            {
              name: "Payments infrastructure",
              children: [
                {
                  name: "Cryptocurrency and blockchain",
                  size: 1250,
                },
                {
                  name: "Instant payments processing",
                  size: 104,
                },
                {
                  name: "Payments fraud & security",
                  size: 14,
                },
                {
                  name: "Others",
                  size: 155,
                },
              ],
            },
            {
              name: "Payments value-added services",
              children: [
                {
                  name: "Loyalty & rewards",
                  size: 308,
                },
                {
                  name: "Others",
                  size: 25,
                },
              ],
            },
          ],
        },
        {
          name: "Retail Accounts",
          children: [
            {
              name: "Accounts & Savings",
              children: [
                {
                  name: "Digital banking",
                  size: 199,
                },
                {
                  name: "Personal financial management",
                  size: 357,
                },
                {
                  name: "Savings",
                  size: 166,
                },
              ],
            },
            {
              name: "Financial planning",
              children: [
                {
                  name: "Comparison website & forums",
                  size: 281,
                },
                {
                  name: "Financial education",
                  size: 203,
                },
                {
                  name: "Retirement planning",
                  size: 96,
                },
              ],
            },
            {
              name: "Digital Challenger Banks",
              children: [
                {
                  name: "Neobanks",
                  size: 158,
                },
                {
                  name: "Challenger Banks",
                  size: 92,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
