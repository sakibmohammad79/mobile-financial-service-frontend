import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

const blogs = [
  {
    id: 1,
    title: "Understanding Financial Systems",
    description:
      "A financial system is a network of institutions, markets, and regulations that facilitate fund transfers, investments, and lending activities. Understanding how it works can greatly improve your financial decision-making...",
    date: "March 4, 2025",
  },
  {
    id: 2,
    title: "The Role of Blockchain in Banking",
    description:
      "Blockchain technology is transforming the banking sector by enhancing security, transparency, and efficiency. In this article, we will explore how blockchain can reshape modern banking practices...",
    date: "February 20, 2025",
  },
  {
    id: 3,
    title: "Investment Strategies for Beginners",
    description:
      "Learn the basics of investing, from stocks and bonds to mutual funds and cryptocurrencies. This article provides an easy-to-follow guide to help beginners understand how to get started in the world of investing...",
    date: "January 15, 2025",
  },
  {
    id: 4,
    title: "The Future of Artificial Intelligence in Finance",
    description:
      "Artificial intelligence is rapidly changing the financial industry, making data analysis faster, more accurate, and insightful. Here, we will discuss the future of AI in automating financial processes and improving decision-making...",
    date: "April 10, 2025",
  },
  {
    id: 5,
    title: "Personal Finance Tips for Millennials",
    description:
      "Millennials are often faced with unique financial challenges, from student loan debt to saving for retirement. In this blog, we share practical tips and strategies to help millennials build a solid financial foundation...",
    date: "March 30, 2025",
  },
  {
    id: 6,
    title: "Understanding Cryptocurrency Regulations",
    description:
      "Cryptocurrencies are often subject to different regulatory frameworks depending on the country. This article breaks down the key regulations you need to know before engaging in cryptocurrency investments...",
    date: "February 5, 2025",
  },
];

const Blog = () => {
  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", py: 8 }}>
      <Typography
        variant="h4"
        color="#E2136E"
        fontWeight="bold"
        textAlign="center"
        mb={4}
      >
        Blog Articles
      </Typography>

      <Grid container spacing={3}>
        {blogs?.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {blog.date}
                </Typography>
                <Typography variant="body2" mt={2}>
                  {blog.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;
