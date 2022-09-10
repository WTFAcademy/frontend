import React, { useState, useEffect } from "react";
import {
  Input,
  Card,
  Grid,
  Link,
  User,
  Avatar,
  Button,
  Modal,
  Text,
  Textarea,
  NextUIProvider,
	createTheme
} from "@nextui-org/react";
import Layout from "@theme/Layout";

export default function Me() {
  const [visible, setVisible] = React.useState(true);
  const openEdit = () => setVisible(true);

  const closeEdit = () => {
    setVisible(false);
    console.log("closed");
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDarkTheme(theme === "dark");
  }, []);
  const darkTheme = createTheme({
    type: "dark",
    theme: {},
  });
  const lightTheme = createTheme({
    type: "light",
    theme: {},
  });
  return (
    <NextUIProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Layout>
        <Grid.Container justify="center">
          <UserInfo openEdit={openEdit} />
        </Grid.Container>
        <div>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            width="50vw"
            open={visible}
            onClose={closeEdit}
          >
            <Modal.Header>
              <Text id="modal-title" b size={18}>
                Edit your profile
              </Text>
            </Modal.Header>
            <Modal.Body>
              <UserForm />
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onClick={closeEdit}>
                Close
              </Button>
              <Button auto onClick={closeEdit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Layout>
    </NextUIProvider>
  );
}

function UserForm() {
  return (
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          css={{ size: "$12" }}
        />
      </Grid>
      <Grid xs={16}>
        <Input
          required
					bordered
          helperText="Required"
          fullWidth
          label="Username"
          placeholder="Enter your username"
        />
      </Grid>
      <Grid xs={16}>
        <Input
					bordered
          fullWidth
          helperText="Required"
          label="Name"
          placeholder="Enter your name"
        />
      </Grid>
      <Grid xs={6}>
        <Input bordered size="lg" helperText="" label="国家/地区" placeholder="" />
      </Grid>
      <Grid xs={6}>
        <Input bordered size="lg" label="城市/省份" placeholder="" />
      </Grid>
      <Grid xs={16}>
        <Textarea
          width="600px"
					bordered
          helperText="Required"
          label="简介"
          placeholder="eg: solidty, javascript"
        />
      </Grid>
      <Grid>
        <Input
          bordered
          label="Github"
          labelLeft="@"
          placeholder="Enter your github"
        />
      </Grid>
      <Grid>
        <Input
          bordered
          label="Twitter"
          labelLeft="@"
          placeholder="Enter your twitter"
        />
      </Grid>
    </Grid.Container>
  );
}

function UserInfo({ openEdit }) {
  return (
    <Card css={{ w: "100vw", h: "500px", margin: "50px" }}>
      <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
        <User
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          name="Ariana Wattson"
          description="UI/UX Designer"
          justify="left"
        />
        <Button auto color="gradient" size="md" ghost onClick={openEdit}>
          Edit
        </Button>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text h5>中国 湖北</Text>
        <Link
          icon
          isExternal
          color="primary"
          target="_blank"
          href="https://github.com/wtfAcademy"
        >
          GitHub
        </Link>
        <Link
          isExternal
          color="primary"
          target="_blank"
          href="https://github.com/wtfAcademy"
        >
          Twitter
        </Link>
        <Text>
          Make beautiful websites regardless of your design experience. Make
          beautiful websites regardless of your design experience. Make
          beautiful websites regardless of your design experience.
        </Text>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
}
