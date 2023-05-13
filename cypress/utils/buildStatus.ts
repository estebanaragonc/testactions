const axios = require('axios');

const BUILD_ID = process.argv[2];

const fetchBuildStatus = async (buildId) => {
  try {
    const response = await axios.get(
      `https://api.browserstack.com/automate/builds/${buildId}.json`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ZWx2aXNfdWtKdm9zOmVHY0NjeFZHTDVRa0xhSE1od0Zm',
          Cookie: 'tracking_id=3d54011f-8efc-4eda-bd92-df427a681548',
        },
      }
    );

    return response.data.build.automation_build.status;
  } catch (error) {
    console.error('Error fetching build status:', error);
    process.exit(1);
  }
};

(async () => {
  const buildStatus = await fetchBuildStatus(BUILD_ID);

  if (buildStatus === 'failed') {
    console.log('Build failed:', buildStatus);
    process.exit(1);
  } else if (buildStatus === 'true') {
    console.log('Build successful:', buildStatus);
    process.exit(0);
  } else {
    console.log('Build status unknown:', buildStatus);
    process.exit(1);
  }
})();
