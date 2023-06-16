import mongoose from "mongoose";

var Schema = mongoose.Schema;
var User = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  fullName: {
    type: String
  },
  username: {
    type: String,
    required: false,
  },

  // Some times, user may give permssion and forget to enable services
  // this key tracks it and redirects to them 
  isCalenderPermissionNeeded: {
    type: Boolean,
    default: false
  },
  alertEmails: [String],
  photoURL: {
    type: String,
    default: "https://firebasestorage.googleapis.com/v0/b/the-notary-app.appspot.com/o/user.png?alt=media&token=a52198aa-5fdc-4a1c-8b22-7824fda01250"
  },
  hasWebsite: {
    type: Boolean,
    default: false
  },
  websiteDomainName: {
    type: String,
    default: null
    // required: false
  },
  hasBusiness: {
    type: Boolean,
    default: false,
    // required: true
  },
  useBusinessDefault: {
    type: Boolean,
    default: false,
  },
  customWebsiteEnabled: {
    type: Boolean,
    default: false
  },
  customeThemeSelected: {
    type: String
  },
  customThemeDomainName: String,
  businessInfo: {
    businessName: String,
    businessImageURL: {
      type: String,
      default: null
    },
    businessEmail: String,
    businessNumber: String,
    businessTaxCode: String,
    businessFax: String,
    businessLocation: {
      completeAddress: String,
      lat: Number,
      lon: Number,
      zip: Number,
      city: String,
      area: String,
      streetAddress: String,
      placeId: String
    },
    country: {
      type: String,
      default: "US"
    }
  },
  uid: {
    type: String
  },
  socialLinks: [
    {
      type: String,
      value: String
    }
  ],
  defaultTimeZone: {
    type: String,
    default: "America/Los_Angeles"
  },
  userTimeZone: {
    timeZoneName: String,
    abbrs: [String],
    untils: [Number],
    offsets: [Number]
  },
  homeLocation: {
    completeAddress: String,
    lat: Number,
    lon: Number,
    zip: Number,
    city: String,
    area: String,
    streetAddress: String,
    placeId: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: Number
  },
  isPhoneNumberVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "user"
  },
  bio: {
    type: String,
    default: null
  },

  isPremiumUser: {
    type: Boolean,
    default: false
  },
  planId: {
    type: Number,
    default: 0
  },
  nextStep: {
    type: Number,
    default: 0
  },
  tokens: [String],
  pushToken: [{
    token: {
      type: String
    },
    deviceType: {
      type: String
    },
    deviceId: {
      type: String
    },
    macAddress: {
      type: String
    },
    isBrowser: {
      type: String
    },
    osType: {
      type: String
    }
  }],
  websiteThemeSelected: {
    type: String
  },
  isCustomDomain: {
    type: Boolean,
    default: false
  },
  createdOn: {
    type: Date,
    // required: true,
    default: Date.now()
  },
  planStartedOn: {
    type: Date
  },
  isPaymentDue: {
    type: Boolean
  },
  amountDue: {
    type: Boolean
  },
  stripeId: {
    type: String
  },

  // Config Related 
  isBusinessInfoSet: {
    type: Boolean,
    // required: true,
    default: false
  },
  isConnectedCalendar: {
    type: Boolean,
    // required: true,
    default: false
  },
  showDummydata: {
    type: Boolean,
    // required: true,
    default: true,
  },
  linkedCalenderEmails: [
    {
      email: String,
      blockDateId: String
    }
  ],
  isProfileUpdated: {
    type: Boolean,
    // required: true,
    default: false
  },
  isSchdulignLinkUpdated: {
    type: Boolean,
    // required: true,
    default: false
  },
  isCostUpdated: {
    type: Boolean,
    // required: true,
    default: false
  },
  bgColor: {
    type: String,
    default: "#0f172a"
  },
  textColor: {
    type: String,
    default: "#E2E8F0"
  },
  softColor: {
    type: String,
    default: "#94a2b8"
  },
  isServiceLinked: {
    type: Boolean,
    // required: true,
    default: false
  },
  isReviewMeetingLinkSet: {
    type: Boolean,
    // required: true,
    default: false
  },
  bgColor: {
    type: String,
    default: "#0f172a"
  },
  textColor: {
    type: String,
    default: "#E2E8F0"
  },
  softColor: {
    type: String,
    default: "#94a2b8"
  },
  isRONMeetingLinkSet: {
    type: Boolean,
    // required: true,
    default: false
  },
  isInvoiceConfigsSet: {
    type: Boolean,
    // required: true,
    default: false
  },

  isCertified: {
    type: Boolean,
    // required: true,
    default: false
  },
  isInsured: {
    type: Boolean,
    // required: true,
    default: false
  },
  meetingLink: {
    type: String,
    default: null
  },
  GoogleReviewLink: {
    type: String,
    default: null
  },
  // Notary Types
  isRealEstate_OFFLINE: {
    type: Boolean,
    // required: true,
    default: false
  },
  isRealEstate_ONLINE: {
    type: Boolean,
    // required: true,
    default: false
  },
  isSkippedCalender: {
    type: Boolean,
    // required: true,
    default: false
  },
  isRON_ONLINE: {
    type: Boolean,
    // required: true,
    default: false
  }, isMOBILE_GENERAL: {
    type: Boolean,
    // required: true,
    default: false
  },

});

const Customer = mongoose.model('customers', User);

export default Customer;



