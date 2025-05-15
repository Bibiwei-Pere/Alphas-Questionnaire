import axios from "axios";

const WORDPRESS_URL = "https://learning.lassod.com";

// Course arrays as defined in your code
const leadership = [
  { cohort: 1, id: 13892 },
  { cohort: 2, id: 15781 },
  { cohort: 3, id: 16050 },
  { cohort: 4, id: 16145 },
  { cohort: 5, id: 16240 },
];

const graphic = [
  { cohort: 1, id: 13866 },
  { cohort: 2, id: 15694 },
  { cohort: 3, id: 15876 },
];

const web = [
  { cohort: 1, id: 13922 },
  { cohort: 2, id: 15607 },
  { cohort: 3, id: 15963 },
];

/**
 * Helper function to determine the buddy group for a given course ID.
 */
const getBuddyGroup = (courseId) => {
  const idNum = Number(courseId); // Convert to number for comparison

  const lead = leadership.find((course) => course.id === idNum);
  if (lead) return { group: "Leadership", cohort: lead.cohort };

  const graph = graphic.find((course) => course.id === idNum);
  if (graph) return { group: "Graphic Design", cohort: graph.cohort };

  const webDev = web.find((course) => course.id === idNum);
  if (webDev) return { group: "Web Development", cohort: webDev.cohort };

  return null;
};

/**
 * Function to fetch and patch existing users based on their course ID
 */
const updateBuddyGroups = async () => {
  try {
    // Fetch all users in a batch instead of making 1500 separate requests
    const allUsersRes = await axios.get(`${WORDPRESS_URL}/wp-json/mongo-wp/v1/get-all-users`);
    const allUsers = allUsersRes.data; // Assume this endpoint returns an array of user objects

    if (!Array.isArray(allUsers) || allUsers.length === 0) {
      console.log("No users found.");
      return;
    }

    for (const user of allUsers) {
      const userId = user.user_id;
      const userCourses = user.courses || [];

      // **Skip users who do not have any course IDs**
      if (userCourses.length === 0) {
        console.log(`Skipping User ${userId}: No enrolled courses.`);
        continue;
      }

      // **Find all applicable buddy groups**
      const buddyGroups = userCourses
        .map(getBuddyGroup) // Convert course IDs to buddy groups
        .filter(Boolean); // Remove null values

      if (buddyGroups.length === 0) {
        console.log(`Skipping User ${userId}: No matching buddy group found.`);
        continue;
      }

      // **Construct buddy group string**
      const buddyGroupString = buddyGroups.map((bg) => `${bg.group} Cohort ${bg.cohort}`).join(", ");

      // **Prepare the payload for updating**
      const payload = { buddy_group: buddyGroupString };

      // **Send PATCH request to update user**
      try {
        const patchRes = await axios.patch(
          `${WORDPRESS_URL}/wp-json/mongo-wp/v1/update-buddy-group/${userId}`,
          payload
        );
        console.log(`Updated User ${userId} with buddy group: ${buddyGroupString}`, patchRes.data);
      } catch (patchError) {
        console.error(`Error updating User ID ${userId}:`, patchError.response?.data || patchError.message);
      }
    }

    console.log("All users processed.");
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
  }
};

// **Run the function**
// Run the function
// updateBuddyGroups();

// const fetchUser = async (userId) => {
//   try {
//     const res = await axios.get(`${WORDPRESS_URL}/wp-json/mongo-wp/v1/get-user/${userId}`);
//     console.log("User data:", res.data);
//   } catch (error) {
//     console.error("Could not fetch user", error.response ? error.response.data : error.message);
//   }
// };

// fetchUser(400);

const fetchAllUsers = async () => {
  try {
    const res = await axios.get(`${WORDPRESS_URL}/wp-json/mongo-wp/v1/get-all-users`);
    console.log("User data:", res.data);
  } catch (error) {
    console.error("Could not fetch user", error.response ? error.response.data : error.message);
  }
};

fetchAllUsers();

const updateUser = async (userId, updateData) => {
  try {
    const res = await axios.patch(`${WORDPRESS_URL}/wp-json/mongo-wp/v1/update-user/${userId}`, updateData);
    console.log("User updated:", res.data);
  } catch (error) {
    console.error("Could not update user", error.response ? error.response.data : error.message);
  }
};

// Example: Updating user with ID 1
// updateUser(1, {
//   first_name: "John",
//   last_name: "Doe",
//   phone_number: "1234567890",
//   avatar: "https://example.com/avatar.jpg",
// });

export const testSingleUserUpdate = async (userId, userCourses) => {
  try {
    // **Skip if user has no courses**
    if (userCourses.length === 0) {
      console.log(`Skipping User ${userId}: No enrolled courses.`);
      return;
    }

    // Find all applicable buddy groups
    const buddyGroups = userCourses.map(getBuddyGroup).filter(Boolean);

    if (buddyGroups.length === 0) {
      console.log(`Skipping User ${userId}: No matching buddy group found.`);
      return;
    }

    // Construct buddy group string
    const buddyGroupString = buddyGroups.map((bg) => `${bg.group} Cohort ${bg.cohort}`).join(", ");

    // Prepare the payload for updating
    const payload = { buddy_group: buddyGroupString };

    // Send PATCH request to update user **and add them to BuddyPress groups**
    const patchRes = await axios.patch(`${WORDPRESS_URL}/wp-json/mongo-wp/v1/update-buddy-group/${userId}`, payload);
    console.log(`Updated User ${userId} with buddy group: ${buddyGroupString}`, patchRes.data);
  } catch (error) {
    console.error(`Error processing User ID ${userId}:`, error.response?.data || error.message);
  }
};

// **Run test for User 400**
// testSingleUserUpdate(400);
