import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  link: string;
  type: "external" | "download" | "internal";
}

interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
}

const resourceCategories: ResourceCategory[] = [
  {
    id: "tutorials",
    title: "Tutorials & Guides",
    description: "Step-by-step guides and tutorials for implementing MTSS strategies",
    resources: [
      {
        title: "Getting Started with MTSS",
        description: "A comprehensive guide for new teachers implementing MTSS in their classroom",
        link: "/tier1-resources",
        type: "internal"
      },
      {
        title: "Data Collection Best Practices",
        description: "Learn effective methods for collecting and analyzing student data",
        link: "/documentation/data-collection.pdf",
        type: "download"
      },
      {
        title: "Intervention Strategies Database",
        description: "Access our complete database of evidence-based intervention strategies",
        link: "https://interventions.education.gov",
        type: "external"
      }
    ]
  },
  {
    id: "tools",
    title: "Tools & Templates",
    description: "Ready-to-use tools and templates for MTSS implementation",
    resources: [
      {
        title: "Behavior Tracking Template",
        description: "Excel template for tracking student behavior data",
        link: "/templates/behavior-tracking.xlsx",
        type: "download"
      },
      {
        title: "Parent Communication Templates",
        description: "Customizable templates for parent communications",
        link: "/templates/parent-communication.docx",
        type: "download"
      }
    ]
  },
  {
    id: "faqs",
    title: "FAQs & Support",
    description: "Common questions and answers about MTSS implementation",
    resources: [
      {
        title: "MTSS FAQ Guide",
        description: "Answers to frequently asked questions about MTSS",
        link: "/support/faq",
        type: "internal"
      },
      {
        title: "Technical Support",
        description: "Get help with technical issues and platform usage",
        link: "https://support.mtss.com",
        type: "external"
      }
    ]
  }
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = resourceCategories.map(category => ({
    ...category,
    resources: category.resources.filter(resource =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.resources.length > 0);

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const getTypeIcon = (type: Resource["type"]) => {
      switch (type) {
        case "external":
          return "↗";
        case "download":
          return "↓";
        default:
          return "→";
      }
    };

    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {resource.title}
              <span className="text-sm text-gray-500">{getTypeIcon(resource.type)}</span>
            </h3>
            <p className="text-gray-600 mt-1">{resource.description}</p>
          </div>
          <a
            href={resource.link}
            target={resource.type === "external" ? "_blank" : undefined}
            rel={resource.type === "external" ? "noopener noreferrer" : undefined}
            className="text-primary hover:underline text-sm font-medium"
          >
            {resource.type === "download" ? "Download" : "View"}
          </a>
        </div>
      </Card>
    );
  };

  return (
    <div className="animate-fade-in p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resources</h1>
        <p className="text-gray-600 max-w-3xl">
          Welcome to our comprehensive resource center. Here you'll find everything you need to implement 
          and maintain an effective MTSS framework, from getting started guides to advanced tools and templates.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="search"
          placeholder="Search resources..."
          className="pl-10 w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="tutorials" className="space-y-6">
        <TabsList>
          {resourceCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {resourceCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              
              {searchQuery && filteredCategories.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No resources found matching your search.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {(searchQuery ? filteredCategories.find(c => c.id === category.id)?.resources : category.resources)?.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Resources;