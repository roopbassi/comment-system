import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";

// Requirements for comments
interface Comment {
  text: string;
  comments: Array<Comment>;
}

export default function CommentSystem() {  
  const [comments, setComments] = useState(Array<Comment>());
  const postComment = (newComment: Comment) => {        
      setComments([...comments, newComment])            // Updates comments with new comment at end
    }
  return(
    <View style = {styles.container}> 
      <View style = {styles.center}>
        <Text style = {styles.title}> COMMENTS </Text>
        <CommentInput postComment={postComment}/>  
      </View>
      <View>
        {comments.map((comment) => (
          <CommentItem comment = {comment}/>  
        ))}
      </View>
    </View>
  )
}

interface CommentItemProps {
  comment: Comment;
}
// Each comment gets passed here and is recursively called and posted
const CommentItem = ({ comment }: CommentItemProps) => {
  const [comments, setComments] = useState(comment.comments)
  const postComment = (newComment: Comment) => {
    setComments([...comments, newComment])  
  };
  const [commentText, setCommentText] = useState('');
  return(
    <View style = {{paddingLeft: 50}}>
      <View style = {styles.commentsPosted}> 
      {comment.text} 
      </View>
      <View style = {styles.replyButton}>       
        <TextInput
        value = {commentText}
        onChangeText = {(text) => setCommentText(text)}
        style = {styles.replyBox}/>
        <Button 
          title = "Enter" 
          color="black"
          onPress = {() => {
          postComment({ text: commentText, comments: [] });
          setCommentText("");
        }}/>
      </View>
      {comments.map((comment) => (     
        <CommentItem comment = {comment}/>    // Recursive call  
      ))}
    </View>
  )
}

interface CommentInputProps{
  postComment: (newComment: Comment) => void;
}
// Handles new comment wrote in the first input section
const CommentInput = ({ postComment }: CommentInputProps) => {
  const [commentText, setCommentText] = useState('');
  return (
    <View style = {styles.input}>
      <TextInput 
        placeholder = "Enter new comment here"
        value = {commentText}
        onChangeText = {(text) => setCommentText(text)}
        style = {styles.placehold}/>
      <Button 
        title = "Enter" 
        color="black"
        onPress = {() => {
          postComment({ text: commentText, comments: [] });
          setCommentText("");
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  },
  center: {
    alignItems:"center",
  },
  title: {
    fontSize: 80,
  },
  input: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30    
  },
  placehold: {
    backgroundColor: '#e3e3e3',
    fontSize: 14,
    width: 200
  }, 
  commentsPosted: {
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: 'black',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    fontSize: 18,
  },
  replyBox:{
    backgroundColor: '#e3e3e3',
    fontSize: 16,
    marginLeft: 40,
    flex: 2,
    height: 10,
    padding: 17
  }, 
  replyButton:{
    flexDirection: 'row',
    marginRight: 40,
  }
})