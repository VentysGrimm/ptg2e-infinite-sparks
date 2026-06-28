import { makeJournal } from "./foundry-builders.mjs";

const CONTENT_VERSION = "2026-06-27.chapter-one.1";

export const RULES_REFERENCE_JOURNALS = [
  makeJournal({
    id: "isChOneRef000001",
    name: "Chapter One: When Gods Collide",
    importId: "rules-reference.chapter-one-when-gods-collide",
    contentVersion: CONTENT_VERSION,
    pdfPages: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    pages: [
      {
        id: "isCh1Page0000001",
        name: "Chapter Overview",
        level: 1,
        pdfPages: [9, 10],
        content: `
          <section class="ptg2e-infinite-sparks">
            <p><strong>When Gods Collide</strong> adds a social framework for pantheons whose members do not all relate to one another in the same way. Connections can start from mortal occupations, archetypes, dominions, or theologies, then become a source of support, friction, and table-facing drama.</p>
            <p>Use this chapter when the group wants the pantheon to feel like a changing social web instead of a static adventuring party. Each rule below is organized for play at the table and points back to its PDF source page.</p>
            <ul>
              <li><strong>Connections</strong> define how two gods currently relate.</li>
              <li><strong>Connection Status</strong> gives that relationship one of four mechanical states.</li>
              <li><strong>Support and Curses</strong> turn those states into visible play incentives.</li>
              <li><strong>Drama guidance</strong> helps the GM keep emotional conflict safe, meaningful, and story-moving.</li>
            </ul>
          </section>
        `
      },
      {
        id: "isCh1Page0000002",
        name: "Pantheon Connections and Status",
        level: 1,
        pdfPages: [10, 11],
        content: `
          <section class="ptg2e-infinite-sparks">
            <p>Connections are chosen after gods in the same pantheon introduce themselves. Players can pick a status directly when the relationship is obvious, or roll when they want the dice to define the starting point.</p>
            <table class="ptg2e-is-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Use At The Table</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Antagonistic (A)</strong></td>
                  <td>The gods clash, bicker, or would rather avoid one another unless the story forces cooperation.</td>
                </tr>
                <tr>
                  <td><strong>Friendly (F)</strong></td>
                  <td>The gods like each other, cooperate easily, and enjoy shared time.</td>
                </tr>
                <tr>
                  <td><strong>Neutral (N)</strong></td>
                  <td>The gods have no strong bond yet. They can work together, but there is no special benefit or pressure.</td>
                </tr>
                <tr>
                  <td><strong>Tense (T)</strong></td>
                  <td>The relationship can function, but stress and limited patience shape the interaction.</td>
                </tr>
              </tbody>
            </table>
            <p>For a new god introduced during play, default each existing pantheon member's Connection to Neutral unless a prior relationship is already established. Neutral Connections can shift after the gods complete a story together.</p>
          </section>
        `
      },
      {
        id: "isCh1Page0000003",
        name: "Random Connection Matrix",
        level: 2,
        pdfPages: [11],
        content: `
          <section class="ptg2e-infinite-sparks">
            <p>When two players want a random starting point, each rolls 1d10 and cross-references the results.</p>
            <table class="ptg2e-is-table ptg2e-is-connection-matrix">
              <thead>
                <tr>
                  <th>Each player rolls 1d10</th>
                  <th>1-4</th>
                  <th>5-7</th>
                  <th>8-9</th>
                  <th>10</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1-4</th>
                  <td>Friendly</td>
                  <td>Friendly</td>
                  <td>Neutral</td>
                  <td>Neutral</td>
                </tr>
                <tr>
                  <th>5-7</th>
                  <td>Friendly</td>
                  <td>Friendly</td>
                  <td>Neutral</td>
                  <td>Tense</td>
                </tr>
                <tr>
                  <th>8-9</th>
                  <td>Neutral</td>
                  <td>Neutral</td>
                  <td>Antagonistic</td>
                  <td>Antagonistic</td>
                </tr>
                <tr>
                  <th>10</th>
                  <td>Neutral</td>
                  <td>Tense</td>
                  <td>Antagonistic</td>
                  <td>Antagonistic</td>
                </tr>
              </tbody>
            </table>
            <p>After the roll, the players should still explain what the status means in the fiction. A rolled Tense result, for example, becomes stronger once the table knows why the gods irritate or mistrust one another.</p>
          </section>
        `
      },
      {
        id: "isCh1Page0000004",
        name: "Support With Connections",
        level: 1,
        pdfPages: [11],
        content: `
          <section class="ptg2e-infinite-sparks">
            <p>Connection Status changes how Support feels and what a failed Support check costs.</p>
            <table class="ptg2e-is-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Support Rule</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Antagonistic</strong></td>
                  <td>A successful Support check works like Tense. On failure, remove only 1 Pantheon Die, and both gods take a Level 1 Condition reflecting the failed cooperation.</td>
                </tr>
                <tr>
                  <td><strong>Friendly</strong></td>
                  <td>Both players gain +1 on the Support attempt. On failure, remove 1 Pantheon Die as the failed teamwork strains the relationship.</td>
                </tr>
                <tr>
                  <td><strong>Neutral</strong></td>
                  <td>Use the standard Support rules from the PTG2E core book.</td>
                </tr>
                <tr>
                  <td><strong>Tense</strong></td>
                  <td>Success adds 1 die to the Pantheon Pool because the gods cooperated despite stress. Failure removes 2 Pantheon Dice.</td>
                </tr>
              </tbody>
            </table>
          </section>
        `
      },
      {
        id: "isCh1Page0000005",
        name: "Relationship Curses and Changing Status",
        level: 1,
        pdfPages: [12, 13],
        content: `
          <section class="ptg2e-infinite-sparks">
            <p>Each Connection Status also has a Curse trigger. These are ways to earn a Pantheon Die by letting the relationship complicate the scene.</p>
            <table class="ptg2e-is-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Curse</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Antagonistic</strong></td>
                  <td><strong>Blowout:</strong> gain 1 Pantheon Die when the character starts an argument that derails progress for themself, the other god, or the pantheon.</td>
                </tr>
                <tr>
                  <td><strong>Friendly</strong></td>
                  <td><strong>One Might Say Best:</strong> gain 1 Pantheon Die when the friends waste time with each other instead of handling something important.</td>
                </tr>
                <tr>
                  <td><strong>Neutral</strong></td>
                  <td><strong>No Reasons:</strong> gain 1 Pantheon Die when the god has no strong reason to help the other and leaves them without aid.</td>
                </tr>
                <tr>
                  <td><strong>Tense</strong></td>
                  <td><strong>Whatever:</strong> gain 1 Pantheon Die when one god walks away from a situation involving the other.</td>
                </tr>
              </tbody>
            </table>
            <p>Connections are meant to change. Between stories, if both players agree, a relationship can move one step up or down: Antagonistic to Tense, Tense to Neutral, Neutral to Friendly, or the reverse.</p>
          </section>
        `
      },
      {
        id: "isCh1Page0000006",
        name: "Sources of Connection",
        level: 1,
        pdfPages: [13, 14, 15],
        content: `
          <section class="ptg2e-infinite-sparks">
            <p>The chapter offers four character-facing routes for deciding why two gods already matter to one another.</p>
            <dl class="ptg2e-is-definition-list">
              <dt>Occupations</dt>
              <dd>Shared careers can create coworkers, rivals, mentors, or class tension. Cross-occupation pairings can also create common causes or uncomfortable power dynamics.</dd>
              <dt>Archetypes</dt>
              <dd>Use the characters' drives and personality patterns to ask whether their instincts support or frustrate each other.</dd>
              <dt>Dominions</dt>
              <dd>Related or opposing divine spheres can create natural alliances, philosophical disputes, or competition over the same mortal space.</dd>
              <dt>Theologies</dt>
              <dd>Belief systems can align, clash, or create rivalry, especially when gods follow different interpretations or hold different ranks within a theology.</dd>
            </dl>
            <p>For very volatile mortal-life pairings, check with the table before locking them in. A direct conflict that appears every session can become the campaign's main engine, but it can also crowd out the pantheon story. Reframe, soften, or replace the pairing when it would make play worse.</p>
          </section>
        `
      },
      {
        id: "isCh1Page0000007",
        name: "Bringing The Drama",
        level: 1,
        pdfPages: [16, 17, 18, 19],
        content: `
          <section class="ptg2e-infinite-sparks">
            <p>Drama needs both conflict and emotion. Connections are a strong way to produce that conflict because they tell the table which relationships are close, strained, indifferent, or hostile.</p>
            <p>Before focusing on pantheon drama, get group buy-in. Some tables want charged emotional scenes, while others prefer action and procedure. If the group is mixed, manage spotlight time so dramatic scenes do not crowd out players who want a different pace.</p>
            <h3>Good Drama</h3>
            <ul>
              <li><strong>Safe:</strong> it respects the people at the table and changes or stops when someone is uncomfortable.</li>
              <li><strong>Meaningful:</strong> it connects to the characters, their Bonds, their histories, or the active story instead of appearing at random.</li>
              <li><strong>Advancing:</strong> it pushes the story forward and avoids deadlock unless the table intentionally wants that kind of PvP pressure.</li>
            </ul>
            <h3>Safety Tools Mentioned</h3>
            <ul>
              <li><strong>Lines and Veils:</strong> set content boundaries before or between sessions.</li>
              <li><strong>X-Card:</strong> let any player remove or edit content during play without needing to justify it.</li>
              <li><strong>Open Door:</strong> allow any player to step away from the table to cool down, regulate, or withdraw consent from the current scene.</li>
            </ul>
            <h3>Drama Scene</h3>
            <p>Add Drama to the list of Scene types. It centers on an emotional exchange between two characters, or between a character and an Extra. It can be friendly or confrontational, often uses a Battle of Wills, and a major scene that substantially changes the game can award +1 XP at the end of the session.</p>
          </section>
        `
      }
    ]
  })
];
