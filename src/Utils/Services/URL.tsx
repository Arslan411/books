export const AppInfo = {
  BaseUrl: 'https://zester.bookstreet.it/v1/',
};

export default {
  BASE_URL: AppInfo.BaseUrl,

  END_POINT: {
    authLogin: 'auth/login', // POST
    authRegister: 'auth/registration', // Post
    authForgot: 'auth/forget', //Post
    authReset: 'auth/reset', //Post
    authConfirmation: 'auth/confirmation', //Post
    getCities: 'school/city', // Post
    getInsitutes: 'school/institute', // Post
    schoolSearch: 'school/search', // Post
    getProposalsList: 'proposal/list', //get
    getRandomProposals: 'proposal/random', //get  10random proposals
    addProposal: 'proposal/insert', //post multipart Form data
    bookSearch: 'book/search', //post multipart Form data
    userProfile: 'user/profile', //Get
    updateProfile: 'user/change', //Get
    deleteAccount: 'user/deletion', //post
    deleteAccVerification: 'user/confirmation', //post
    authCredentials: 'auth/credentials', //post change email/password
    authChange: 'auth/change', //post change credentials
    proposalSearch: 'proposal/search', // post / All available proposal for a book
    proposalAround: 'proposal/around', //get
    proposalChange: 'proposal/change', //get
    proposalAccept: 'proposal/accept', //get
    proposalReport: 'proposal/report', //post
    proposalRevoke: 'proposal/revoke', //post
    bookValidation: 'book/validation', //post
  },
};
