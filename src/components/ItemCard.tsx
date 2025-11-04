import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    date_occurred: string;
    image_url?: string;
    type: "lost" | "found";
    contact_info?: string;
  };
  onContact?: () => void;
}

const ItemCard = ({ item, onContact }: ItemCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-medium">
      {item.image_url && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={item.image_url}
            alt={item.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-foreground line-clamp-1">
            {item.title}
          </h3>
          <Badge
            variant={item.type === "lost" ? "destructive" : "default"}
            className="shrink-0"
          >
            {item.type === "lost" ? "Lost" : "Found"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            <span>{item.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(item.date_occurred), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </CardContent>
      {onContact && (
        <CardFooter>
          <Button onClick={onContact} className="w-full">
            Contact Owner
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ItemCard;
