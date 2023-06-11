import React from "react";

const Developers = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Post />
          <Post />
          <Post />
        </Grid>
        <Grid item xs={4}>
          <div className="border p-3 my-1 rounded">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias odit
          </div>
          <div className="border p-3 my-1 rounded">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias odit
          </div>
          <div className="border p-3 my-1 rounded">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias odit
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Developers;
