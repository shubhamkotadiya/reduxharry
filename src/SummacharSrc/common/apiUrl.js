let startingUrl = "";

export const mode = "development";
switch (mode) {
    case "development":
        startingUrl = "https://testing.summacharpathshala.in/"
        break;
    case "production":
        startingUrl = "https://backend-panel.summacharpathshala.in/"
        break;
}

export const StateCityCountry_api_token = "KOu8ur2aZ1OAJpSp0VwuPTAhKA1MAj3o2I5CoQsBhTyfnlU-MtaRyJnoenmIHjYsRvU"
const apiUrl = {
    root: startingUrl,
    getUserDataUrl: startingUrl + "api/profile/my_profile/",
    signUpUrl: startingUrl + "",
    loginWithPassword: startingUrl + 'api/login_with_password/',
    newsUrl: startingUrl + "api/story/",
    inStoryQuizSubmit: startingUrl + "api/question/submit/",
    newsLetterUrl: startingUrl + "api/weekly_newsletter/",
    quizUrl: startingUrl + "api/activity/",
    submitQuizUrl: startingUrl + "api/activity/submit/",
    submitCompetitionFile: startingUrl + "api/activity/",
    activitiesUrl: startingUrl + "api/activities/",
    bookMarkUrl: startingUrl + "api/story/bookmark/",
    bookMarkedUrl: startingUrl + "api/story/bookmarked/",
    categoriesUrl: startingUrl + "api/subject_list/",
    plansUrl: startingUrl + "api/sub_plans/",
    profileUrl: startingUrl + "api/profile/my_profile/",
    usernameListUrl: startingUrl + "api/profile/usernames_list/",
    orderCreate: startingUrl + "api/order_create/",
    orderComplete: startingUrl + "api/order_complete/",
    subjectList: startingUrl + "api/academic_subject_list/",
    subjectVideos: startingUrl + "api/video/",
    subjectVideoProgress: startingUrl + 'api/video/progress/',
    subjectVideoWatched: startingUrl + "api/video/watched/",
    storyUrl: startingUrl + "api/story/",
    preIntUrl: startingUrl + "api/premium_interest/",
    partnerListUrl: startingUrl + "api/partner_list/",
    topicUrl: startingUrl + "api/chapter/",
    conceptList: startingUrl + "api/concept/",
    calendarUrl: startingUrl + "api/events_calendar/",
    acadFreeQuiz: startingUrl + "api/activities/free_acad_quizzes/",
    createOtpUrl: startingUrl + "api/otp_create/",
    verifyOtpUrl: startingUrl + "api/otp_validate/",
    contactUsUrl: startingUrl + "api/contact_us/",
    emailVerify: startingUrl + "api/profile/send_verification_email/",
    emailVerification: startingUrl + "api/profile/verify_email/",
    boardsListUrl: startingUrl + "api/boards/",
    acadRevisionUrl: startingUrl + 'api/revision_notes/',
    acadQNAUrl: startingUrl + 'api/answerbook/',
    performanceUrl: startingUrl + 'api/performance/',
    checkCouponCodeUrl: startingUrl + 'api/check_coupon/',
    billingDetailsUrl: startingUrl + 'api/billing_details/',
    stuffUrl: startingUrl + "api/stuff_of_the_day/",
    questionofTheDayUrl: startingUrl + "api/question_of_the_day/",
    rateJokeUrl: startingUrl + "api/rate_stuff_of_the_day/",
    kidsCornerUrl: startingUrl + "api/kids_corner_competition/",
    certificateUrl: startingUrl + "api/certificate_list/",
    searchUrl: startingUrl + "api/search/",
    sudokuUrl: startingUrl + 'api/sudoku_of_the_day/'
}
export default apiUrl;

