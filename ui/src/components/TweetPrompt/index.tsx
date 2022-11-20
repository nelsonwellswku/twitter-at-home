export const TweetPrompt = () => {
    const submitTweet = () => alert('Alert!');

    return (
        <div>
            <input placeholder="What's the buzz?" />
            <button onClick={submitTweet}>Submit</button>
        </div>
    )
}
