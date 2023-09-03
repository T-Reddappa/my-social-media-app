import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: " abcd1",
    firstName: "reddy",
    lastName: "T",
    username: "Reddy",
    password: "reddy1234",
    profilePicture:
      "https://media.licdn.com/dms/image/C4D03AQHv1SvbdPPM9A/profile-displayphoto-shrink_400_400/0/1664248232839?e=1697068800&v=beta&t=vTL-kaB7piXRLJHOXC-4PIIhHPocGu9kLyzfQtQpH9w",
    coverPicture: "",
    description:
      "Senior Software Engineer @Microsoft | Creator of India’s biggest programming community | Tweets about JavaScript, ReactJS, Career and Startups",
    website: "",
    following: [],
    followers: [],
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: " abcd2",
    firstName: "Nirvi",
    lastName: "Nirvi",
    username: "Nirvi",
    password: "nirvi1234",
    profilePicture:
      "https://tse4.mm.bing.net/th?id=OIP.HriNIvVww3aj-tdZrtyZzgHaE8&pid=Api&P=0&h=180",
    coverPicture: "",
    description:
      "Senior Software Engineer @Microsoft | Creator of India’s biggest programming community | Tweets about JavaScript, ReactJS, Career and Startups",
    website: "https://nirviportfolio.com",
    following: [],
    followers: [],
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: " abcd3",
    firstName: "Reddy",
    lastName: "Priya",
    username: "Priya",
    password: "priya1234",
    profilePicture:
      "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min-480x340.jpg",
    coverPicture: "",
    description:
      "Senior Software Engineer @Microsoft | Creator of India’s biggest programming community | Tweets about JavaScript, ReactJS, Career and Startups",
    website: "",
    following: [],
    followers: [],
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
