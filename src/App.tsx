import "./App.css";

// function App() {
//   const [greetMsg, setGreetMsg] = useState("");
//   const [name, setName] = useState("");

//   async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     setGreetMsg(await invoke("greet", { name }));
//   }

//   return <div className="container dark:bg-secondary"></div>;
// }

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - replace this with your actual data fetching logic

interface UrlObject {
  url: string;
  domain: string;
  timestamp: Date;
};

const mockUrls: UrlObject[] = [
  {
    url: "https://example.com/page1",
    domain: "example.com",
    timestamp: new Date("2023-05-10T10:30:00"),
  },
  {
    url: "https://example.org/page2",
    domain: "example.org",
    timestamp: new Date("2023-05-09T15:45:00"),
  },
  {
    url: "https://example.net/page3",
    domain: "example.net",
    timestamp: new Date("2023-05-08T09:15:00"),
  },
  {
    url: "https://example.com/page4",
    domain: "example.com",
    timestamp: new Date("2023-05-07T14:20:00"),
  },
];

export default function UrlExplorer() {
  const [timePeriod, setTimePeriod] = useState("today");

  const groupUrlsByDomain = (urls: UrlObject[]) => {
    return urls.reduce<Record<string, UrlObject[]>>((acc, url) => {
      if (!acc[url.domain]) {
        acc[url.domain] = [];
      }
      acc[url.domain].push(url);
      return acc;
    }, {});
  };

  const filterUrlsByTimePeriod = (urls: UrlObject[], period: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(thisWeekStart.getDate() - today.getDay());

    switch (period) {
      case "today":
        return urls.filter((url) => url.timestamp >= today);
      case "yesterday":
        return urls.filter(
          (url) => url.timestamp >= yesterday && url.timestamp < today,
        );
      case "thisWeek":
        return urls.filter((url) => url.timestamp >= thisWeekStart);
      default:
        return urls;
    }
  };

  const sortedUrls = [...mockUrls].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  const groupedUrls = groupUrlsByDomain(mockUrls);
  const filteredUrls = filterUrlsByTimePeriod(mockUrls, timePeriod);

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>URL Explorer</CardTitle>
        <CardDescription>
          Explore collected URLs by various categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All URLs</TabsTrigger>
            <TabsTrigger value="byDomain">By Domain</TabsTrigger>
            <TabsTrigger value="byTime">By Time Period</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUrls.map((url, index) => (
                  <TableRow key={index}>
                    <TableCell>{url.url}</TableCell>
                    <TableCell>{url.domain}</TableCell>
                    <TableCell>{url.timestamp.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="byDomain">
            {Object.entries(groupedUrls).map(([domain, urls]) => (
              <div key={domain} className="mb-4">
                <h3 className="mb-2 text-lg font-semibold">{domain}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {urls.map((url, index) => (
                      <TableRow key={index}>
                        <TableCell>{url.url}</TableCell>
                        <TableCell>{url.timestamp.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="byTime">
            <div className="mb-4">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUrls.map((url, index) => (
                  <TableRow key={index}>
                    <TableCell>{url.url}</TableCell>
                    <TableCell>{url.domain}</TableCell>
                    <TableCell>{url.timestamp.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// export default App;
