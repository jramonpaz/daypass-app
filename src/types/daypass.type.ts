// Reviews
export interface IDaypassReview {
  name: string
  location: string
  rating: number
  image: string
  time: string
  comment: string
}

// Polices

export interface IDaypassPolices {
  cancellation_policy: CancellationPolicy
  house_rules: HouseRules
}

export interface CancellationPolicy {
  description: string
  after: After
  cleaning_fee: string
}

export interface After {
  date: string
  time: string
  refund: string
}

export interface HouseRules {
  title: string
  description: string
  rules: Rule[]
}

export interface Rule {
  title: string
  entry?: string
  rules?: string[]
}

