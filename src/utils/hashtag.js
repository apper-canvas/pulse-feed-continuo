import { useNavigate } from "react-router-dom";

export const parseHashtags = (text, onHashtagClick) => {
  if (!text) return text;
  
  // Regex to match hashtags (# followed by word characters)
  const hashtagRegex = /#(\w+)/g;
  
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = hashtagRegex.exec(text)) !== null) {
    // Add text before hashtag
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    // Add clickable hashtag
    parts.push(
      <span
        key={`hashtag-${match.index}`}
        className="hashtag-link"
        onClick={() => onHashtagClick(match[1])}
      >
        #{match[1]}
      </span>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text after last hashtag
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

export const extractHashtags = (text) => {
  if (!text) return [];
  
  const hashtagRegex = /#(\w+)/g;
  const hashtags = [];
  let match;
  
  while ((match = hashtagRegex.exec(text)) !== null) {
    hashtags.push(match[1]);
  }
  
  return hashtags;
};

export const useHashtagNavigation = () => {
  const navigate = useNavigate();
  
  const navigateToHashtag = (hashtag) => {
    navigate(`/search?q=${encodeURIComponent(`#${hashtag}`)}`);
  };
  
  return { navigateToHashtag };
};