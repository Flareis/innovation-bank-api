import { Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface IdeaCardProps {
  id: string;
  title: string;
  description: string;
  authorName: string;
  votesCount: number;
  hasVoted: boolean;
  onVote: (ideaId: string) => void;
}

export const IdeaCard = ({
  id,
  title,
  description,
  authorName,
  votesCount,
  hasVoted,
  onVote,
}: IdeaCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white/95 backdrop-blur-sm border-innovation-blue/30"
      onClick={() => navigate(`/idea/${id}`)}
    >
      <CardHeader>
        <CardTitle className="text-innovation-navy group-hover:text-innovation-red transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-innovation-purple/70">
          por {authorName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          variant={hasVoted ? "default" : "outline"}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onVote(id);
          }}
          className={hasVoted ? "bg-innovation-red hover:bg-innovation-red/90" : "border-innovation-red text-innovation-red hover:bg-innovation-red hover:text-white"}
        >
          <Heart className={`mr-2 h-4 w-4 ${hasVoted ? "fill-current" : ""}`} />
          {votesCount} {votesCount === 1 ? "voto" : "votos"}
        </Button>
      </CardFooter>
    </Card>
  );
};