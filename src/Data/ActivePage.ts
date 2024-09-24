/**
 * This enum defines the different pages that a user can navigate to in the web application.
 * It is used to track and manage the current active page within the application, ensuring that the correct
 * view is rendered based on the user's interaction.
 * 
 * Enum values represent:
 * - `Calorie Counter`: The page where users can log and track their daily calorie intake.
 * - `Profile`: The page displaying user profile information such as weight, height, and goals.
 * - `Diary`: The page where users can view their food diary and review their daily meals and progress.
 * 
 * Purpose:
 * - This enum is used to manage the state of the web application, particularly for determining which page 
 * should be shown to the user at any given time.
 */

/**
 * Enum for representing the different active pages of the web application.
 * 
 * Values:
 * - `Calorie Counter`: {number} 0 - Represents the page for tracking daily calorie intake.
 * - `Profile`: {number} 1 - Represents the user profile page, where personal details and goals are shown.
 * - `Diary`: {number} 2 - Represents the food diary page, where users can view their logged meals and progress.
 * 
 * This enum is used to manage the application's routing and page rendering based on user navigation.
 */
enum ActivePage{
    "Calorie Counter" = 0,  // Page for logging and tracking daily calorie intake
    "Profile",              // User profile page with personal information and goals
    "Diary"                 // Food diary page displaying logged meals and progress
}

export default ActivePage;