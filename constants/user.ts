export const currentUser = {
  firstName: "Sonam",
  lastName:  "Tamang",
  email:     "sonam@helm.so",
  role:      "Founder",
  company:   "Helm Inc.",
  timezone:  "UTC",
  currency:  "USD",

  // Derived display helpers
  get name()     { return this.firstName; },
  get initials() { return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase(); },
};
