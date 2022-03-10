# EasyRetro (former FunRetro) export

[![License][license-badge]][license-url]

> CLI tool to easily export [EasyRetro.io](https://funretro.io/) retrospective boards using Playwright

## Installing / Getting started

It's required to have [npm](https://www.npmjs.com/get-npm) installed locally to follow the instructions.

```shell
git clone https://github.com/julykaz/funretro-export.git
cd funretro-export
npm install
npm start -- "http://funretro.io/board..." "../exported-file.txt"
```

## TODO

- More export options (PDF, CSV)

## Licensing

MIT License

[license-badge]: https://img.shields.io/github/license/robertoachar/docker-express-mongodb.svg
[license-url]: https://opensource.org/licenses/MIT

## User Story

As a scrum master I want to export the content of the team’s previous retrospective board in a format that can be uploaded into a new retrospective board for the next retrospective meeting.

## Acceptance Criteria

• The output file should have an extension of .csv
• The file name should be the title of the board without spaces.
• The content of the file should be structured like:
o Column 1, Column 2, Column 3, etc.
o Row 1 Column1 , Row 1 Column 2, Row 1 Column 3, etc.
o Row 2 Column1 , Row 2 Column 2, Row 2 Column 3, etc.
o Etc.
• Only content with at least 1 vote should be included in the file output.

## Additional Enhancements

• Refactor the code using your favorite best practices
• Introduce a command so that could be used so that the user can pick the output format:
o Format 1 as the program works initially
o Format 2 based on the new format defined in the acceptance criteria

## output example

# Malwarebytes Sprint 21 Retrospective

## Start

- Luigi - Using OKRs to align the team around organizational goals and objectives.
- Mario - Hire our next team member based on an excellent interview and completion of the technical challenge. (+2)
- Listing points for development and points for quality assurance when sizing new stories.
- Mario - Telling the engineering manager as soon as you realize a story will not be finished by the end of the sprint. (+1)

## Stop

- Sonic - Using weird or default avatars on our accounts so that new team members can really put a face with a name.
- Rayman - Forgetting to factor in time for Quality Assurance when sizing new stories.

## Continue

- Tony - Conducting a survey of the team about each new hire around their 30th day. (+1)
- Lara - Using our technical challenge to identify the best candidates for our open opportunity.
- Spyro - Emphasizing to new hires how we use Slack by referring to our very short document in Confluence. (+2)
