function Profile({ value, onChange }) {
  return (
    <textarea
      name="profile"
      value={value}
      onChange={onChange}
      placeholder="Example: Motivated graduate with internship experience in social media. Strong communicator, quick learner, and team player seeking a junior marketing role."
      rows="4"
    />
  )
}

export default Profile
