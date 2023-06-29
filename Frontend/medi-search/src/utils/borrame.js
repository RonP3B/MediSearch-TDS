const users = [
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17k",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe1",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827cj",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith1",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17h",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe2",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827cg",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith2",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17f",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe3",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827cd",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith3",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17s",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe4",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827ca",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith4",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17p",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe5",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827co",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith5",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17i",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe6",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827cu",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith6",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17y",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe7",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827ct",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith7",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17r",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe8",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827ce",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith8",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd1w",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe9",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827c<aq",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith9",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
  {
    id: "e4e8b350-687d-4de6-a44c-6fc06e6cfd17fdg",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "John Doe0",
    company: "ABC Company",
    isVerified: true,
    status: "active",
    role: "Leader",
  },
  {
    id: "947a6e4d-3492-4e4e-ae25-3278e986827",
    avatarUrl:
      "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-65479.jpg?w=2000",
    name: "Jane Smith0",
    company: "XYZ Corporation",
    isVerified: false,
    status: "banned",
    role: "UI Designer",
  },
];

export default users;
