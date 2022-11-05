const LiveGoals = [];

var { userlove, userloveDL, currentUserInfo, account_tracking_id } = window;
currentUserInfo = JSON.parse(localStorage.getItem("currentUserInfo"));

const iframeData = {
  checklist: (checklist) => {
    //function to return html for checklist iframe with all event listeners added to it.
    let numOfCompletedItems =
      iframeHandlerFunctions.checklist.getChecklistProgress(checklist);
    let itemsInChecklist = checklist.checklist_item;
    let checklistProgress = itemsInChecklist
      ? (numOfCompletedItems * 100) / itemsInChecklist.length
      : 0;
    const styles = `<style>
          .ul-checklist-box {
            width: 280px;
            padding: 20px 20px 10px 20px;
            background-color: #fff;
            box-shadow: 0 0 8px rgb(0 0 0 / 15%);
            min-height: 160px;
            opacity: 1;
            transition: opacity 0.15s ease-in-out;
            border-radius: 6px;
          }
          .ul-checklist-box.hide {
            opacity: 0;
          }
          .ul-checklist-container {
            position: absolute;
            bottom: 2px;
            right: 2px;
          }
          body {
            margin: 0;
          }
          .ul-checklist-beacon-box {
            display: ${checklist.beacon_status ? "flex" : "none"};
            justify-content: flex-end;
            margin-top: 20px;
            width: 97%;
            position: relative;
          }
          .ul-checklist-beacon-box button {
            color: ${checklist.beacon_text_color};
            background: ${checklist.beacon_bg_color};
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            };
            border: none;
            height: 38px;
            letter-spacing: 0.2px;
            border-radius: 50px;
            padding: 11px 16px;
            cursor: pointer;
            line-height: 1;
            font-size: 14px;
            display: flex;
            align-items: center;
          }
          .ul-checklist-beacon-box button::after {
            content: attr(data-progress);
            background-color: ${checklist.beacon_text_color};
            color: ${checklist.beacon_bg_color};
            position: absolute;
            z-index: 1;
            width: 15px;
            height: 15px;
            padding: 5px;
            border-radius: 50%;
            left: 95%;
            bottom: 58%;
            border: 0.1px solid ${checklist.beacon_bg_color};
          }
    
          .ul-checklist-box-title {
            font-size: 18px;
            font-weight: 700;
            line-height: 24px;
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            };
          }
          .ul-checklist-progressbar-container {
            width: 100%;
            height: 5px;
            background-color: #e9e9ef30;
            border-radius: 5px;
            overflow: hidden;
            margin: 15px 0 30px 0;
            position: relative;
          }
          .ul-checklist-progressbar-value {
            background-color: ${checklist.beacon_bg_color};
            height: 5px;
            position: absolute;
            transition: width 0.3s ease-in;
          }
          .ul-checklist-box-description {
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            };
            font-size: 15px;
            line-height: 28px;
            color: #646f79;
          }
          .ul-checklist-items-wrapper {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            row-gap: 5px;
            max-height: 250px;
            overflow: hidden scroll;
          }
          ::-webkit-scrollbar{
            display: none;
          }
          .ul-checklist-item {
            background-color: transparent;
            border: none;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            align-items: center;
          }
          .ul-checklist-item:hover {
            background-color: #e9e9ef30;
          }
          .ul-checklist-item span {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            color: ${
              checklist.checklist_congratulations_content?.text_color || "#000"
            }
          }
          .ul-checklist-item input[type="checkbox"] {
            width: 20px;
            height: 20px;
            margin-left: -5px;
            accent-color: ${checklist.beacon_bg_color};
            pointer-events: none;
          }
          .ul-checklist-dismiss-link {
            display: ${checklist.dismiss_link ? "flex" : "none"};
            justify-content: flex-end;
            margin-top: -9px;
            margin-right: -9px;
          }
          .ul-checklist-dismiss-link button{
            background-color: transparent;
            border: none;
            cursor: pointer;
          }
          .ul-checklist-dismiss-link svg {
            width: 10px;
            height: 10px;
            padding: 4px;
            color: #ea4335;
            background-color: #ea443544;
            border-radius: 4px;
          }
          .ul-checklist-dismiss-box {
            position: absolute;
            top: 10px;
            background-color: #fff;
            display: none;
            flex-direction: column;
            box-shadow: 0px 0px 7px 0px rgb(0 0 0 / 30%);
            padding: 20px;
            left: 9px;
            top: 20px;
            height: 110px;
            z-index: 1;
            border-radius: 6px;
          }
          .ul-checklist-dismiss-box.show {
            display: flex;
          }
    
          .ul-checklist-dismiss-box p {
            color: var(--dark-gray);
            text-align: center;
            font-size: 14px;
            line-height: 18px;
            text-overflow: ellipsis;
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            }
          }
    
          .ul-checklist-cancel-button {
            color: #fff;
            background: #09b570;
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            };
            border: none;
            height: 38px;
            letter-spacing: 0.2px;
            border-radius: 4px;
            padding: 11px 16px;
            cursor: pointer;
            line-height: 1;
            font-size: 14px;
          }
    
          .ul-checklist-confirm-button {
            color: #fff;
            background: #ea4335;
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            };
            border: none;
            height: 38px;
            letter-spacing: 0.2px;
            border-radius: 4px;
            padding: 11px 16px;
            cursor: pointer;
            line-height: 1;
            font-size: 14px;
          }
    
          .ul-checklist-dismiss-box-button {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
          }
          .ul-checklist-congratulation-box {
            background-color: #fff;        
            display: none;
            flex-direction: column;
          }
          .ul-checklist-congratulation-box.show {
            display: flex;
          }
    
          .ul-checklist-congratulation-title {
            color: ${
              checklist.checklist_congratulations_content?.success_color ||
              "#09b570"
            }
          }
          .ul-checklist-congratulation-title h3 {
            margin: 0;
            text-align: center;
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            };
          }
          .ul-checklist-congratulation-text {
            font-size: 14px;
            margin: 8px 10px 10px 10px;
            text-align: center;
            color: ${
              checklist.checklist_congratulations_content?.text_color || "#000"
            };
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            };
          }
          .ul-checklist-congratulations-item {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 10px;
          }
          .ul-checklist-congratulations-item s {
            font-family: ${
              checklist.fonts ? checklist.fonts.font_name : "ROBOTO_Regular"
            };
            font-size: 14px;
          }
          .ul-checklist-congratulations-image-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .ul-checklist-congratulations-item-wrapper {
              max-height: 250px;
              overflow: hidden scroll;
              row-gap: 10px;
              display: flex;
              flex-direction: column;
          }
        </style>`;
    //confirmation dialog html
    const confirmationDialog = `<div class="ul-checklist-dismiss-box" id="ul-checklist-dismiss-box">
            <p>${userloveMethods.common.attributeToValue(
              checklist.prompt_text
            )}</p>
            <div class="ul-checklist-dismiss-box-button">
              <button class="ul-checklist-cancel-button" id="ul-checklist-cancel-button">
                ${userloveMethods.common.attributeToValue(
                  checklist.cancel_button_text
                )}
              </button>
              <button
                class="ul-checklist-confirm-button"
                id="ul-checklist-confirm-button"
              >
                ${userloveMethods.common.attributeToValue(
                  checklist.confirm_button_text
                )}
              </button>
            </div>
          </div>`;
    //completed items html
    let completedItems = checklist.checklist_item
      .map((chk_item) => {
        return `<div class="ul-checklist-congratulations-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill=${
                  `"${checklist.checklist_congratulations_content?.success_color}"` ||
                  "#09b570"
                }
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z" />
              </svg>
              <s>${userloveMethods.common.attributeToValue(chk_item.title)}</s>
            </div>`;
      })
      .join("");
    //congratulations image
    const congratulationsImage =
      `<span style="font-size: 50px;">${checklist.checklist_congratulations_content?.emoji}</span>` ||
      `<img
          alt=""
          width="50px"
          height="50px"
          src="${ulConstants.onboardingServer}${checklist.checklist_congratulations_content?.image}"
        />`;
    //congratulations box html
    const checklistCongratulationsBox = checklist
      .checklist_congratulations_content?.show_congratulations_content
      ? `<div
                id="ul-checklist-congratulation-box"
                class="ul-checklist-congratulation-box"
              >
              <div class="ul-checklist-congratulations-image-wrapper">
                ${congratulationsImage}
              </div>
              <div class="ul-checklist-congratulation-title">
                <h3>${userloveMethods.common.attributeToValue(
                  checklist.checklist_congratulations_content.title
                )}</h3>
              </div>
              <div class="ul-checklist-congratulation-text">
                ${userloveMethods.common.attributeToValue(
                  checklist.checklist_congratulations_content.text_content
                )}
              </div>
              <div class="ul-checklist-congratulations-item-wrapper">
                ${completedItems}
              </div>
            </div>`
      : ``;
    //checklist items html
    let checklistItems = checklist.checklist_item
      ?.map((chk_item) => {
        return `<button id="ul-checklist-item-${
          chk_item.checklist_item_id
        }" class="ul-checklist-item">
              <span>
                <input
                  id="ul-checklist-item-checkbox-${chk_item.checklist_item_id}"
                  type="checkbox"
                  readOnly
                />
                <span id="ul-checklist-item-title-${
                  chk_item.checklist_item_id
                }"> 
                  ${userloveMethods.common.attributeToValue(chk_item.title)}
                </span>
              </span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </button>`;
      })
      .join("");
    //main checklist template
    const checklistIframeTemplate = `<div
            id="ul-checklist-container-${checklist.checklist_id}"
            class="ul-checklist-container"
          >
            <div
              id="ul-checklist-box"
              class="ul-checklist-box"
            >
            
            ${confirmationDialog}
              <div class="ul-checklist-dismiss-link">
                <button id="ul-checklist-dismiss-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="10px"
                    viewBox="0 0 329.26933 329"
                    width="10px"
                    fill="#EF514D"
                  >
                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                  </svg>
                </button>
              </div>
              <div id="ul-checklist-box-content">
                <span class="ul-checklist-box-title">${userloveMethods.common.attributeToValue(
                  checklist.content_title
                )}</span>
                <div class="ul-checklist-box-description">
                  ${userloveMethods.common.attributeToValue(
                    checklist.content_description
                  )}
                </div>
                <div class="ul-checklist-progressbar-container">
                  <span
                    class="ul-checklist-progressbar-value"
                    id="ul-checklist-progressbar-value"
                    style="width: ${checklistProgress}%"
                  ></span>
                </div>
                <div
                  class="ul-checklist-items-wrapper"
                  id="ul-checklist-items-wrapper-${checklist.checklist_id}"
                >
                  ${checklistItems}
                </div>
              </div>
              ${checklistCongratulationsBox}
            </div>
            <div
              class="ul-checklist-beacon-box"
              id="ul-checklist-beacon-${checklist.checklist_id}"
            >
              <button data-progress="${
                itemsInChecklist
                  ? itemsInChecklist.length - numOfCompletedItems
                  : 0
              }">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  width="30px"
                  height="30px"
                  fill=${checklist.beacon_text_color}
                >
                    <path d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 44.15 19.85 54 32 54 C 44.15 54 54 44.15 54 32 C 54 28.81 53.319844 25.769063 52.089844 23.039062 L 49.359375 27.259766 C 49.779375 28.769766 50 30.36 50 32 C 50 41.94 41.94 50 32 50 C 22.06 50 14 41.94 14 32 C 14 22.06 22.06 14 32 14 C 36.33 14 40.300391 15.530312 43.400391 18.070312 L 45.580078 14.689453 C 41.840078 11.749453 37.13 10 32 10 z M 49.962891 15.064453 C 49.321104 15.077373 48.695937 15.397188 48.320312 15.976562 L 33.798828 38.421875 L 24.777344 28.085938 C 24.052344 27.254938 22.789078 27.165578 21.955078 27.892578 C 21.123078 28.618578 21.036672 29.882844 21.763672 30.714844 L 32.527344 43.050781 C 32.908344 43.487781 33.460156 43.736328 34.035156 43.736328 C 34.083156 43.736328 34.129734 43.735422 34.177734 43.732422 C 34.804734 43.687422 35.373844 43.349266 35.714844 42.822266 L 51.679688 18.150391 C 52.279688 17.222391 52.014891 15.984766 51.087891 15.384766 C 50.739891 15.159766 50.347963 15.056701 49.962891 15.064453 z" />
                </svg>
                ${userloveMethods.common.attributeToValue(
                  checklist.beacon_text
                )}
              </button>
            </div>
          </div>`;

    const checklistIframe = document.getElementById(
      `ul-checklist-${checklist.checklist_id}`
    );
    const checklistDocument =
      checklistIframe.contentDocument || checklistIframe.contentWindow.document;
    checklistDocument.body.innerHTML = checklistIframeTemplate;
    checklistDocument.head.innerHTML = styles;
    let checklistBox = checklistDocument.getElementById(
      `ul-checklist-container-${checklist.checklist_id}`
    );
    if (checklistBox) {
      checklistIframe.style.height = `${checklistBox.clientHeight + 10}px`;
      checklistIframe.style.opacity = 1;
    }

    iframeHandlerFunctions.checklist.createChecklistListeners(checklist);
  },
  productTour: (productTour) => {
    //finding progress of product tours in feature progress
    let productTourProgress =
      userloveMethods.common.findFeatureProgressByFeatureType(
        "product_tour"
      )?.feature_progress;
    //finding progress of current product tour if it exists
    let currentProductTourProgress = productTourProgress?.find(
      (tour) => tour.product_tour_id === productTour.product_tour_id
    );
    let completedStepsInOrder = currentProductTourProgress?.seen_steps?.sort(
      (first, next) => first.step_index - next.step_index
    );
    let productTourOnPageInd =
      ulPageData.triggeredFlowsForThisPage.productTours.findIndex(
        (tour) => tour.product_tour_id === productTour.product_tour_id
      );
    if (productTourOnPageInd > -1) {
      ulPageData.triggeredFlowsForThisPage.productTours[
        productTourOnPageInd
      ].seen_steps = completedStepsInOrder || [];
    }
    if (completedStepsInOrder?.length > 0) {
      //if completedSteps already exists, find the next step to be shown
      let mostRecentCompletedStep = completedStepsInOrder?.at(
        completedStepsInOrder.length - 1
      );
      let mostRecentCompletedStepData = productTour.product_tour_steps.find(
        (step) =>
          mostRecentCompletedStep &&
          step.step_index === mostRecentCompletedStep.step_index + 1
      );
      if (mostRecentCompletedStepData) {
        //check if next step to be shown is the last step of product tour

        iframeHandlerFunctions.productTour.createStepContent(
          mostRecentCompletedStepData,
          productTour.product_tour_id
        );
      }
    } else {
      //else pick out the first step of the product tour i.e. step_index = 1
      let firstStepToBeShown = productTour.product_tour_steps.find(
        (step) => step.step_index === 1
      );
      if (firstStepToBeShown) {
        iframeHandlerFunctions.productTour.createStepContent(
          firstStepToBeShown,
          productTour.product_tour_id
        );
      }
    }
  },
  nps: (nps) => {
    let npsProgress =
      userloveMethods.common.findFeatureProgressByFeatureType("nps");

    npsProgress = npsProgress ? npsProgress.feature_progress : [];
    let lastTriggeredNpsEntry;
    // find last progress for this nps
    if (npsProgress.length !== 0) {
      npsProgress = npsProgress.filter(
        (npsProgress) => npsProgress.nps_id === nps.nps_id
      );
      lastTriggeredNpsEntry = npsProgress.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )[0];
    } else {
      lastTriggeredNpsEntry = null;
    }
    if (
      lastTriggeredNpsEntry &&
      !lastTriggeredNpsEntry.completed_at &&
      !lastTriggeredNpsEntry.dismissed_at
    ) {
      let lastCompletedQuestion =
        lastTriggeredNpsEntry.progress_json.nps_questions[
          lastTriggeredNpsEntry.progress_json.nps_questions.length - 1
        ];

      if (!lastCompletedQuestion) {
        lastCompletedQuestion = nps.nps_question.find(
          (q) => q.sort_order === 0
        );
        iframeHandlerFunctions.nps.createNpsQuestion(
          lastCompletedQuestion,
          nps
        );
      } else {
        let nextQuestion = nps.nps_question.find(
          (q) => q.sort_order === lastCompletedQuestion.sort_order + 1
        );
        iframeHandlerFunctions.nps.createNpsQuestion(nextQuestion, nps);
      }
    } else {
      let firstQuestion = nps.nps_question.find((q) => q.sort_order === 0);
      // create nps question Iframe
      iframeHandlerFunctions.nps.createNpsQuestion(firstQuestion, nps);
    }
  },
};

const iframeHandlerFunctions = {
  //functions to handle user interaction with checklist iframe.
  checklist: {
    beaconClickHandler: (checklist) => {
      //function to hide and show checklist when beacon button is clicked
      var position = `${checklist.positions.position}`;
      var positionObj =
        iframeHandlerFunctions.checklist.getChecklistPosition(position);
      let checklistIframe = document.getElementById(
        `ul-checklist-${checklist.checklist_id}`
      );
      let checklistDocument =
        checklistIframe.contentDocument ||
        checklistIframe.contentWindow.document;
      let checklistContentBox =
        checklistDocument.getElementById(`ul-checklist-box`);
      let checklistContainer = checklistDocument.getElementById(
        `ul-checklist-container-${checklist.checklist_id}`
      );
      if (checklistContainer && checklistContentBox) {
        checklistIframe.style.height =
          checklistContentBox.classList.value.includes("hide")
            ? `${checklistContainer.clientHeight + 10}px`
            : "52px";
        if (position.toLowerCase().match("top")) {
          checklistIframe.style.top =
            checklistContentBox.classList.value.includes("hide")
              ? positionObj.top
              : `${
                  0.02 * ulConstants.screen.height +
                  checklistContentBox.clientHeight +
                  16.3
                }px`;
        }

        checklistContentBox.classList.toggle("hide");
      }
    },
    getChecklistProgress: (checklist) => {
      //function to get progress of a checklist to show on beacon badge and progress bar
      let checklistProgress =
        userloveMethods.common.findFeatureProgressByFeatureType("checklist");
      checklistProgress = checklistProgress
        ? checklistProgress.feature_progress
        : [];
      let currentChecklistProgress = checklistProgress.find(
        (chk_p) => chk_p.checklist_id === checklist.checklist_id
      );
      let numOfCompletedItems = currentChecklistProgress
        ? currentChecklistProgress.checklist_items.length
        : 0;
      return numOfCompletedItems;
    },
    checklistItemClickHandler: (checklist_item) => {
      //function that gets called when a checklist item is clicked
      if (checklist_item.go_to_page) {
        if (
          !new RegExp(userloveDL.get("current_domain")).test(
            checklist_item.go_to_page_url?.split("//")[1]?.split("/")[0]
          )
        ) {
          userlove.track({
            event: ulConstants.events.pageViewed,
            data: {
              page_url: checklist_item.go_to_page_url,
            },
          });
        }

        window.open(checklist_item.go_to_page_url, "_blank");
      }
      if (checklist_item.launch_flow) {
        userlove.launchProductTour(checklist_item.product_tour.product_tour_id);
      }
    },
    checklistDismissClicked: (checklist) => {
      //function that is called when close button on checklist is called.
      let checklistIframe = document.getElementById(
        `ul-checklist-${checklist.checklist_id}`
      );
      let checklistDocument =
        checklistIframe.contentDocument ||
        checklistIframe.contentWindow.document;
      let congratulationsBox = checklistDocument.getElementById(
        "ul-checklist-congratulation-box"
      );
      if (congratulationsBox?.classList.value.includes("show")) {
        iframeHandlerFunctions.checklist.removeChecklist(
          checklist.checklist_id
        );
      } else {
        checklistDocument
          .getElementById("ul-checklist-dismiss-box")
          .classList.add("show");
      }
    },
    cancelDismissChecklist: (checklist) => {
      //function that is called if user keeps the checklist
      let checklistIframe = document.getElementById(
        `ul-checklist-${checklist.checklist_id}`
      );
      let checklistDocument =
        checklistIframe.contentDocument ||
        checklistIframe.contentWindow.document;
      checklistDocument
        .getElementById("ul-checklist-dismiss-box")
        .classList.remove("show");
    },
    confirmDismissChecklist: (checklist) => {
      //function that is called if user dismisses the checklist
      userlove.hideChecklist(checklist.checklist_id);
    },
    createChecklistListeners: (checklist) => {
      //function to add all event listeners to checklist buttons, items, etc.
      let checklistIframe = document.getElementById(
        `ul-checklist-${checklist.checklist_id}`
      );
      let checklistDocument =
        checklistIframe.contentDocument ||
        checklistIframe.contentWindow.document;
      let beaconButton = checklistDocument.getElementById(
        `ul-checklist-beacon-${checklist.checklist_id}`
      );
      if (beaconButton) {
        beaconButton.addEventListener("click", () => {
          iframeHandlerFunctions.checklist.beaconClickHandler(checklist);
        });
      }

      checklist.checklist_item &&
        checklist.checklist_item.forEach((chk_item) => {
          let itemElement = checklistDocument.getElementById(
            `ul-checklist-item-${chk_item.checklist_item_id}`
          );
          if (itemElement) {
            itemElement.addEventListener("click", () => {
              iframeHandlerFunctions.checklist.checklistItemClickHandler(
                chk_item
              );
            });
          }
        });
      let dismissButton = checklistDocument.getElementById(
        "ul-checklist-dismiss-button"
      );
      if (dismissButton) {
        dismissButton.addEventListener("click", () => {
          iframeHandlerFunctions.checklist.checklistDismissClicked(checklist);
        });
      }

      let cancelButton = checklistDocument.getElementById(
        "ul-checklist-cancel-button"
      );
      if (cancelButton) {
        cancelButton.addEventListener("click", () => {
          iframeHandlerFunctions.checklist.cancelDismissChecklist(checklist);
        });
      }

      let confirmButton = checklistDocument.getElementById(
        "ul-checklist-confirm-button"
      );
      if (confirmButton) {
        confirmButton.addEventListener("click", () => {
          iframeHandlerFunctions.checklist.confirmDismissChecklist(checklist);
        });
      }
    },
    markCompletedChecklistItem: (checklist_id, checklist_item_id) => {
      //function that is called when an item in a checklist is completed.
      let checklistIframe = document.getElementById(
        `ul-checklist-${checklist_id}`
      );
      if (!checklistIframe) {
        return;
      }
      let checklistDocument =
        checklistIframe.contentDocument ||
        checklistIframe.contentWindow.document;
      const currentChecklist = LiveChecklists.find(
        (chk) => chk.checklist_id === checklist_id
      );
      let completedItemTitle = checklistDocument.getElementById(
        `ul-checklist-item-title-${checklist_item_id}`
      );
      if (completedItemTitle) {
        completedItemTitle.style.textDecoration = "line-through";
      }
      let completedItemCheckbox = checklistDocument.getElementById(
        `ul-checklist-item-checkbox-${checklist_item_id}`
      );
      if (completedItemCheckbox) {
        completedItemCheckbox.checked = true;
      }
      let checklistBeaconButton = checklistDocument.querySelector(
        `.ul-checklist-beacon-box button`
      );
      let numOfCompletedItems =
        iframeHandlerFunctions.checklist.getChecklistProgress(currentChecklist);
      let checklistItems = currentChecklist.checklist_item;
      let checklistProgress =
        checklistItems && checklistItems.length > 0
          ? (numOfCompletedItems * 100) / checklistItems.length
          : 0;
      if (checklistBeaconButton) {
        checklistBeaconButton.setAttribute(
          "data-progress",
          checklistItems ? checklistItems.length - numOfCompletedItems : 0
        );
      }
      let checklistProgressBar = checklistDocument.getElementById(
        "ul-checklist-progressbar-value"
      );
      checklistProgressBar.style.width = `${checklistProgress}%`;
    },
    markCompletedChecklist: (checklist_id) => {
      //function that is called when a checklist is completed
      let checklistIframe = document.getElementById(
        `ul-checklist-${checklist_id}`
      );
      let checklistData = LiveChecklists.find(
        (chk) => checklist_id === chk.checklist_id
      );
      if (
        checklistData?.checklist_congratulations_content
          ?.show_congratulations_content
      ) {
        if (!checklistIframe) {
          return;
        }

        setTimeout(() => {
          let checklistDocument =
            checklistIframe.contentDocument ||
            checklistIframe.contentWindow.document;
          let congratulationsContent = checklistDocument.getElementById(
            "ul-checklist-congratulation-box"
          );
          if (congratulationsContent) {
            congratulationsContent.classList.add("show");
          }
          let checklistContent = checklistDocument.getElementById(
            "ul-checklist-box-content"
          );
          if (checklistContent) {
            checklistContent.style.display = "none";
          }
          let checklistBox = checklistDocument.getElementById(
            `ul-checklist-container-${checklist_id}`
          );
          if (checklistBox) {
            checklistIframe.style.height = `${
              checklistBox.clientHeight + 10
            }px`;
          }
        }, 500);
        //remove checklist iframe automatically after 6 seconds after completion.
        // setTimeout(() => {
        //   iframeHandlerFunctions.checklist.removeChecklist(checklist_id);
        // }, 6000);
      } else {
        setTimeout(() => {
          iframeHandlerFunctions.checklist.removeChecklist(checklist_id);
        }, 6000);
      }
    },
    createChecklist: (checklist) => {
      var position = `${checklist.positions.position}`;
      var positionObj =
        iframeHandlerFunctions.checklist.getChecklistPosition(position);
      const ifr = document.createElement("iframe");
      ifr.id = `ul-checklist-${checklist.checklist_id}`;
      ifr.style.position = "fixed";
      ifr.style.border = 0;
      ifr.style.width = "340px";
      ifr.style.zIndex = 9999999;
      ifr.style.opacity = 0;
      document.body.appendChild(ifr);
      let checklistIframe = null;
      try {
        checklistIframe = document.getElementById(
          `ul-checklist-${checklist.checklist_id}`
        );
        checklistIframe.style.top = positionObj.top;
        checklistIframe.style.left = positionObj.left;
        checklistIframe.style.right = positionObj.right;
        checklistIframe.style.bottom = positionObj.bottom;
        iframeData.checklist(checklist);
      } catch (error) {
        console.error("error", error.message);
      }
    },
    removeChecklist: (checklist_id) => {
      const checklistToHide = document.getElementById(
        `ul-checklist-${checklist_id}`
      );
      if (checklistToHide) {
        document.body.removeChild(checklistToHide);
      }
    },
    getChecklistPosition: (position) => {
      switch (position.toLowerCase()) {
        case "top left":
          return {
            left: "2%",
            top: "2%",
            right: "auto",
            bottom: "auto",
          };
        case "top right":
          return {
            right: "2%",
            top: "2%",
            left: "auto",
            bottom: "auto",
          };
        case "bottom left":
          return {
            left: "2%",
            bottom: "2%",
            right: "auto",
            top: "auto",
          };
        case "bottom right":
          return {
            right: "2%",
            bottom: "2%",
            top: "auto",
            left: "auto",
          };
        default:
          return {
            right: "2%",
            bottom: "2%",
            top: "auto",
            left: "auto",
          };
      }
    },
  },
  //functions to handle user interaction with product tour iframe.
  productTour: {
    startProductTour: (productTour) => {
      let productTourStepIframe = document.createElement("iframe");
      productTourStepIframe.id = `ul-product-tour-${productTour.product_tour_id}`;
      document.body.appendChild(productTourStepIframe);
      productTourStepIframe.style.width = `100%`;
      productTourStepIframe.style.height = `100%`;
      productTourStepIframe.style.border = "none";
      productTourStepIframe.style.overflow = "hidden";
      productTourStepIframe.style.scrolling = "no";
      productTourStepIframe.style.position = "fixed";
      productTourStepIframe.style.top = 0;
      productTourStepIframe.style.zIndex = 2147483645;
      productTourStepIframe.contentDocument.body.style.margin = 0;
      productTourStepIframe.contentDocument.body.style.overflow = "hidden";
      productTourStepIframe.contentWindow.onload = resetTimer;
      productTourStepIframe.contentWindow.onmousemove = resetTimer;
      productTourStepIframe.contentWindow.onmousedown = resetTimer;
      productTourStepIframe.contentWindow.ontouchstart = resetTimer;
      productTourStepIframe.contentWindow.onclick = resetTimer;
      productTourStepIframe.contentWindow.onkeydown = resetTimer;
      productTourStepIframe.contentWindow.oncontextmenu = resetTimer;
      productTourStepIframe.contentWindow.onscroll = resetTimer;
      iframeData.productTour(productTour);
    },
    createStepContent: (stepToBeShown, product_tour_id) => {
      let productTourSteps = LiveProductTours.find(
        (tour) => tour.product_tour_id === product_tour_id
      )?.product_tour_steps;

      let isLastStep = !Boolean(
        productTourSteps.find(
          (step) => step.step_index === stepToBeShown.step_index + 1
        )
      );
      let productTourIndex =
        ulPageData.triggeredFlowsForThisPage.productTours.findIndex(
          (tour) => tour.product_tour_id === product_tour_id
        );
      if (productTourIndex > -1) {
        ulPageData.triggeredFlowsForThisPage.productTours[
          productTourIndex
        ].seen_steps.push(stepToBeShown.product_tour_step_id);
      }

      if (
        stepToBeShown.product_tour_template_type.toLowerCase() ===
        ulConstants.productTourData.templates.slideUp
      ) {
        iframeHandlerFunctions.productTour.createSlideUpStep(
          stepToBeShown,
          product_tour_id,
          isLastStep
        );
      } else if (
        stepToBeShown.product_tour_template_type.toLowerCase() ===
        ulConstants.productTourData.templates.modal
      ) {
        iframeHandlerFunctions.productTour.createModalStep(
          stepToBeShown,
          product_tour_id,
          isLastStep
        );
      } else if (
        stepToBeShown.product_tour_template_type.toLowerCase() ===
        ulConstants.productTourData.templates.tooltip
      ) {
        iframeHandlerFunctions.productTour.createTooltipStep(
          stepToBeShown,
          product_tour_id,
          isLastStep
        );
      } else if (
        stepToBeShown.product_tour_template_type.toLowerCase() ===
        ulConstants.productTourData.templates.hotspot
      ) {
        iframeHandlerFunctions.productTour.createHotspotStep(
          stepToBeShown,
          product_tour_id,
          isLastStep
        );
      }
    },
    createModalStep: (stepToBeShown, product_tour_id, isLastStep) => {
      let stepContent = JSON.parse(stepToBeShown.step_content)[0];
      let productTourIframe = document.getElementById(
        `ul-product-tour-${product_tour_id}`
      );
      productTourIframe.name = "modal";
      let productTourDocument =
        productTourIframe?.contentDocument ||
        productTourIframe?.contentWindow.document;
      if (productTourDocument) {
        productTourDocument.body.style.background = `none`;
        productTourIframe.style.position = "fixed";
        productTourIframe.style.height = `${ulConstants.screen.height}px`;
        productTourIframe.style.width = `${ulConstants.screen.width}px`;
      }
      let closingDivTag = `</div>`;
      let modalHtmlMain = `<div
            class="modal-content"
            id="modal-content"
            style="
              background-color:${stepContent.modalBackgroundColor};
              position: fixed;
              z-index: 2000;
              transform:translate(-50%, -50%);
              width:${stepContent.width}px;
              justify-content: center;
              padding: 20px;
              text-align: center;
              overflow: hidden auto;
              border-radius:${stepContent.corner}px;
              box-shadow : ${
                stepContent.backdrop
                  ? `${stepContent.backdropColor}44 0px 0px 0px 100vw`
                  : "none"
              };
              margin-left:50vw;
              margin-top:50vh;
              max-height:60%;
            "
          >`;
      let modalCloseBtn = `<div>
          <button
            id="ul-product-tour-close-btn"
            class="gs-Product-tour-close"
            
            style="
              display: ${stepContent.closeBtn === false ? "none" : "block"};
              float: right;
              font-size: 30px;
              font-weight: bold;
              color: ${stepContent.closeColor};
              cursor: pointer;
              background: transparent;
              border: none;
            ">
            &times;
          </button>
        </div>`;
      let modalBodyHtmlStart = `<div
          className="modal-body"
          style="
            display: ${stepContent.selectedLayout !== 0 ? "flex" : ""};
            justify-content: ${
              stepContent.selectedLayout !== 0 ? "space-evenly" : ""
            };
            flex-direction:${
              stepContent.selectedLayout === 2 ? "row-reverse" : ""
            };">`;
      let imageBlockDivStart = `<div style="
          padding: 2px;
          display: ${stepContent.selectedLayout !== 0 ? "flex" : ""};
          flex-direction: ${stepContent.selectedLayout !== 0 ? "column" : ""};
        ">`;
      let nonImageBlockDivStart = `<div style=" padding:2px ">`;
      let nextButtonHtml = `<div style="
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
        ">
        <button
          id="ul-product-tour-next-button"
          style="
            cursor: pointer;
            height: 30%;
            margin-top: 2%;
            background-color: ${stepContent.buttonBackgroundColor}44;
            color:${stepContent.buttonColor};
            border-radius: 5px;
            border: 1px solid white;
            padding: 3px;
            width: 90px;
            font-size: 21px;
          ">${isLastStep ? "Close" : "Next"}
        </button></div>`;
      let nonImageBlocksHtml = stepContent.block
        .map((block) =>
          iframeHandlerFunctions.productTour.createBlocksForModal(block)
        )
        .join("");
      let productTourProgress =
        iframeHandlerFunctions.productTour.getProductTourProgress(
          product_tour_id
        );
      let progressbarHtml = stepContent.progressbar
        ? `<div 
            class="ul-product-tour-progress-bar"
            style="
              height: 7px;
              width: ${stepContent.width + 40}px;
              top: 20px;
              position: relative;
              left: -20px;
              overflow: hidden;
              background: #fff;
            "
          >
          <div id="ul-product-tour-progress-value" 
            style="
              width: ${productTourProgress}%;
              background: #4BA6EF;
              height: 7px;
            ">
          </div>
        </div>`
        : "";
      let imageBlocksHtml = stepContent.block
        .map((block) => {
          if (block.type === "Image") {
            return iframeHandlerFunctions.productTour.modalBlocks.createImageBlock(
              block
            );
          } else {
            return "";
          }
        })
        .join("");

      let finalHtml =
        modalHtmlMain +
        modalCloseBtn +
        modalBodyHtmlStart +
        imageBlockDivStart +
        imageBlocksHtml +
        closingDivTag +
        nonImageBlockDivStart +
        nonImageBlocksHtml +
        closingDivTag +
        closingDivTag +
        nextButtonHtml +
        progressbarHtml +
        closingDivTag;
      productTourDocument.body.innerHTML = finalHtml;
      iframeHandlerFunctions.productTour.createProductTourListeners(
        product_tour_id,
        stepToBeShown,
        isLastStep
      );
      productTourDocument.head.innerHTML = `<style>
        .modal-content::-webkit-scrollbar{
          display: none;
        }
      </style>`;
    },
    createSlideUpStep: (stepToBeShown, product_tour_id, isLastStep) => {
      let stepContent = JSON.parse(stepToBeShown.step_content)[0];
      let productTourIframe = document.getElementById(
        `ul-product-tour-${product_tour_id}`
      );
      productTourIframe.name = "slide_up";

      let productTourDocument =
        productTourIframe?.contentDocument ||
        productTourIframe?.contentWindow.document;
      if (productTourDocument) {
        productTourDocument.body.style.background = `${stepContent.backdropColor}44`;
        productTourIframe.style.position = "fixed";
        productTourIframe.style.height = `${ulConstants.screen.height}px`;
        productTourIframe.style.width = `${ulConstants.screen.width}px`;
      }
      //get transition and position for slide up
      let closingDivTag = `</div>`;
      let modalHtmlMain = `<div
            class="modal-content"
            id="modal-content"
            style="
              background-color:${stepContent.modalBackgroundColor};
              position: fixed;
              z-index: 2000;
              transform:translate(-50%, -50%);
              width:${stepContent.width}px;
              justify-content: center;
              padding: 20px;
              max-height:60%;
              text-align: center;
              border-radius:${stepContent.corner}px;
              opacity:0;
              overflow: hidden auto;
              margin-top: -100vh;
              margin-left: -100vw;
            "
          >`;

      let modalCloseBtn = `<div>
          <button
            id="ul-product-tour-close-btn"
            class="gs-Product-tour-close"
            
            style="
              display: ${stepContent.closeBtn === false ? "none" : "block"};
              float: right;
              font-size: 30px;
              font-weight: bold;
              color: ${stepContent.closeColor};
              cursor: pointer;
              background: transparent;
              border: none;
            ">
            &times;
          </button>
        </div>`;
      let modalBodyHtmlStart = `<div
          className="modal-body"
          style="
            display: ${stepContent.selectedLayout !== 0 ? "flex" : ""};
            justify-content: ${
              stepContent.selectedLayout !== 0 ? "space-evenly" : ""
            };
            flex-direction:${
              stepContent.selectedLayout === 2 ? "row-reverse" : ""
            };">`;
      let imageBlockDivStart = `<div style="
          padding: 2px;
          display: ${stepContent.selectedLayout !== 0 ? "flex" : ""};
          flex-direction: ${stepContent.selectedLayout !== 0 ? "column" : ""};
        ">`;
      let nonImageBlockDivStart = `<div style=" padding:2px ">`;
      let nextButtonHtml = `<div style="
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
        ">
        <button
          id="ul-product-tour-next-button"
          style="
            cursor: pointer;
            height: 30%;
            margin-top: 2%;
            background-color: ${stepContent.buttonBackgroundColor}44;
            color:${stepContent.buttonColor};
            border-radius: 5px;
            border: 1px solid white;
            padding: 3px;
            width: 90px;
            font-size: 21px;
          ">${isLastStep ? "Close" : "Next"}
        </button></div>`;
      let nonImageBlocksHtml = stepContent.block
        .map((block) =>
          iframeHandlerFunctions.productTour.createBlocksForModal(block)
        )
        .join("");
      let productTourProgress =
        iframeHandlerFunctions.productTour.getProductTourProgress(
          product_tour_id
        );
      let progressbarHtml = stepContent.progressbar
        ? `<div 
            class="ul-product-tour-progress-bar"
            style="
              height: 7px;
              width: ${stepContent.width + 40}px;
              top: 20px;
              position: relative;
              left: -20px;
              overflow: hidden;
              background: #fff;
            "
          >
          <div id="ul-product-tour-progress-value" 
            style="
              width: ${productTourProgress}%;
              background: #4BA6EF;
              height: 7px;
            ">
          </div>
        </div>`
        : "";
      let imageBlocksHtml = stepContent.block
        .map((block) => {
          if (block.type === "Image") {
            return iframeHandlerFunctions.productTour.modalBlocks.createImageBlock(
              block
            );
          } else {
            return "";
          }
        })
        .join("");

      let finalHtml =
        modalHtmlMain +
        modalCloseBtn +
        modalBodyHtmlStart +
        imageBlockDivStart +
        imageBlocksHtml +
        closingDivTag +
        nonImageBlockDivStart +
        nonImageBlocksHtml +
        closingDivTag +
        closingDivTag +
        nextButtonHtml +
        progressbarHtml +
        closingDivTag;
      productTourDocument.body.innerHTML = finalHtml;
      iframeHandlerFunctions.productTour.createProductTourListeners(
        product_tour_id,
        stepToBeShown,
        isLastStep
      );
      let slideUp = productTourDocument.getElementById("modal-content");
      let { initialMargin, finalMargin, transition } =
        iframeHandlerFunctions.productTour.getSlideUpPosition(
          stepContent,
          slideUp
        );
      if (initialMargin.left) {
        slideUp.style.marginTop = initialMargin.top;
        slideUp.style.marginLeft = initialMargin.left;
      }
      slideUp.style.transition = transition;

      if (slideUp) {
        setTimeout(() => {
          slideUp.style.opacity = 1;
          slideUp.style.marginTop = finalMargin.top;
          slideUp.style.marginLeft = finalMargin.left;
        }, 500);
      }
      productTourDocument.head.innerHTML = `<style>
          .modal-content::-webkit-scrollbar{
            display: none;
          }
        </style>`;
    },
    createTooltipStep: (stepToBeShown, product_tour_id, isLastStep) => {
      let stepContent = JSON.parse(stepToBeShown.step_content)[0];
      let { tooltipLeft, tooltipTop } =
        iframeHandlerFunctions.productTour.getPositionBySelector(
          stepContent.selector,
          stepContent.view,
          ulConstants.productTourData.templates.tooltip
        );
      if (!tooltipLeft || !tooltipTop) {
        iframeHandlerFunctions.productTour.nextButtonEventListener(
          stepToBeShown,
          product_tour_id,
          isLastStep
        );
        return;
      }
      let productTourIframe = document.getElementById(
        `ul-product-tour-${product_tour_id}`
      );
      productTourIframe.name = "tooltip";

      if (productTourIframe) {
        productTourIframe.style.position = "absolute";
        productTourIframe.style.height = `${Math.max(
          document.body.clientHeight,
          ulConstants.screen.height
        )}px`;
        productTourIframe.style.width = `${document.body.clientWidth}px`;
      }
      let productTourDocument =
        productTourIframe?.contentDocument ||
        productTourIframe?.contentWindow.document;
      if (productTourDocument) {
        productTourDocument.body.style.background = `${stepContent.backdropColor}44`;
      }
      let tooltipMainHtml = `<div
          class="tooltip-content"
          id="tooltip-content"
          style="
            background-color:transparent;
            position: absolute;
            top:${tooltipTop}px;
            z-index:2147483646;
            left:${tooltipLeft}px;
          ">`;

      let closingDivTag = `</div>`;

      let tooltipIconDivStart = `<div
          class="gs-tooltip-top-icon-and-arrow"
          style=" background-color: transparent;">`;

      let tooltipIconSvg = `<span 
        class="gs-tooltip-arrow"
        id="gs-tooltip-arrow"
          style="
            z-index: 999999;
            top:
              ${stepContent.tooltipArrowTop};
            transform: ${stepContent.tooltipArrowTransform};
            content: ;
            position: absolute;
            display: block;
            left:
              ${stepContent.tooltipArrowLeft};
            border: 15px solid transparent;
            border-top: 0;
            border-bottom: 15px solid;
            border-bottom-color: ${stepContent.tooltipBackground};
            margin-top: 4.5px;
          "></span>`;

      let tooltipBodyHtml = `<div
        class="modal-content"
        id="modal-content"
        style="
          opacity: 0;
          position: absolute;
          background-color: ${stepContent.tooltipBackground};
          top:
            ${stepContent.tooltipModalContentTop};
          z-index: 99999;
          left:
            ${stepContent.tooltipModalContentLeft};
          justify-content: center;
          margin-top: 0px;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 20px;
          padding-right: 20px;
          text-align: center;
          border-radius: 5px;
          min-width: 280px;
          min-height: 95px;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
          box-shadow: ${
            stepContent.tooltipBackdrop === true
              ? `transparent 0px 0px 0px 100vw`
              : "none"
          };"
        >`;

      let tooltipCloseBtn = `<div>
        <button
          id="ul-product-tour-close-btn"
          class="gs-Product-tour-close"
          
          style="
            display: ${stepContent.tooltipCloseButton ? "block" : "none"};
            float: right;
            font-size: 30px;
            font-weight: bold;
            color: ${stepContent.tooltipCloseColor};
            cursor: pointer;
            background: transparent;
            border: none;
          ">
          &times;
        </button>
      </div>`;

      let tooltipBlockDivStart = `<div class="tooltip-body" style="
          display: ${stepContent.tooltipSelectedLayout !== 0 ? "flex" : ""};
          justify-content: ${
            stepContent.tooltipSelectedLayout !== 0 ? "space-evenly" : ""
          };
          flex-direction:${
            stepContent.tooltipSelectedLayout === 2 ? "row-reverse" : "column"
          };">`;

      let tooltipImageBlockStart = `<div
          style="
            padding: 2px;
            display: ${stepContent !== 0 ? "flex" : ""};
            flex-direction: ${stepContent !== 0 ? "column" : ""};"
        >`;

      let tooltipNonImageBlockStart = `<div style=" padding:2px ">`;

      let tooltipNextButtonHtml = `<div 
          style="
          width: 100%;
          display: flex;
          flex-direction: row-reverse;">
            <button
              id="ul-product-tour-next-button"
              style="
                cursor: pointer;
                height: 30%;
                margin-top: 2%;
                background-color: #876afb44;
                color: black;
                border-radius: 5px;
                border: 1px solid white;
                padding: 3px;
                width: 90px;
                font-size: 21px;"
              >
              ${isLastStep ? "Close" : "Next"}
            </button>
          </div>`;

      let nonImageBlocksHtml = stepContent.block
        .map((block) =>
          iframeHandlerFunctions.productTour.createBlocksForTooltip(block)
        )
        .join("");

      let imageBlocksHtml = stepContent.block
        .map((block) => {
          if (block.type === "Image") {
            return iframeHandlerFunctions.productTour.tooltipBlocks.createImageBlock(
              block
            );
          } else {
            return "";
          }
        })
        .join("");

      let finalHtml =
        tooltipMainHtml +
        tooltipIconDivStart +
        tooltipIconSvg +
        closingDivTag +
        tooltipBodyHtml +
        tooltipCloseBtn +
        tooltipBlockDivStart +
        tooltipImageBlockStart +
        imageBlocksHtml +
        closingDivTag +
        tooltipNonImageBlockStart +
        nonImageBlocksHtml +
        closingDivTag +
        closingDivTag +
        tooltipNextButtonHtml +
        closingDivTag +
        closingDivTag;

      productTourDocument.body.innerHTML = finalHtml;
      iframeHandlerFunctions.productTour.setTooltipLayout(
        stepContent,
        productTourDocument,
        ulConstants.productTourData.templates.tooltip
      );
      iframeHandlerFunctions.productTour.createProductTourListeners(
        product_tour_id,
        stepToBeShown,
        isLastStep
      );
    },
    createHotspotStep: (stepToBeShown, product_tour_id, isLastStep) => {
      let stepContent = JSON.parse(stepToBeShown.step_content)[0];
      let productTourIframe = document.getElementById(
        `ul-product-tour-${product_tour_id}`
      );
      if (productTourIframe) {
        productTourIframe.style.position = "absolute";
        productTourIframe.style.height = `${Math.max(
          document.body.clientHeight,
          ulConstants.screen.height
        )}px`;
        productTourIframe.style.width = `${
          (document.body.clientWidth, ulConstants.screen.width)
        }px`;
      }
      productTourIframe.name = "hotspot";

      let productTourDocument =
        productTourIframe?.contentDocument ||
        productTourIframe?.contentWindow.document;
      if (productTourDocument) {
        productTourDocument.body.style.background = `${stepContent.backdropColor}44`;
      }
      let { tooltipLeft, tooltipTop } =
        iframeHandlerFunctions.productTour.getPositionBySelector(
          stepContent.selector,
          stepContent.view,
          ulConstants.productTourData.templates.hotspot
        );
      if (!tooltipLeft || !tooltipTop) {
        iframeHandlerFunctions.productTour.nextButtonEventListener(
          stepToBeShown,
          product_tour_id,
          isLastStep
        );
        return;
      }
      let hotspotMainHtml = `<div
          class="tooltip-content"
          id="tooltip-content"
          style="
            background-color:transparent;
            position: absolute;
            top:${tooltipTop}px;
            z-index:2147483646;
            left:${tooltipLeft}px;
          ">`;

      let closingDivTag = `</div>`;

      let hotspotIconDivStart = `<div
          id="ul-hotspot-icon"
          class="gs-tooltip-top-icon-and-arrow"
          style=" background-color: transparent;">`;
      let hotspotIcon = iframeHandlerFunctions.productTour.getProductHotspotSvg(
        stepContent.tooltipTopIcon
      );
      let hotspotIconSvg = `<span
        id="gs-tooltip-arrow"
        style="
          cursor: pointer;
          background-color: transparent;
          margin-left:
            ${stepContent.tooltipIconMarginLeft};
          margin-top:
            ${stepContent.tooltipIconMarginTop};">${hotspotIcon}</span>`;

      let hotspotBodyHtml = `<div
        id="modal-content"
        class="modal-content"
        style="
          position: absolute;
          background-color: ${stepContent.tooltipBackground};
          top:
            ${stepContent.tooltipModalContentTop};
          z-index: 99999;
          left:
            ${stepContent.tooltipModalContentLeft};
          margin-top: 0px;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 20px;
          padding-right: 20px;
          text-align: center;
          border-radius: 5px;
          min-width: 280px;
          min-height: 95px;
          display:flex;
          flex-direction:column;
          opacity: 1;
          justify-content:flex-end;
          box-shadow: ${
            stepContent.tooltipBackdrop === true
              ? `transparent 0px 0px 0px 100vw`
              : "none"
          };"
        >`;

      let hotspotCloseBtn = `<div>
        <button
          id="ul-product-tour-close-btn"
          class="gs-Product-tour-close"
          
          style="
            display: ${stepContent.tooltipCloseButton ? "block" : "none"};
            float: right;
            font-size: 30px;
            font-weight: bold;
            color: ${stepContent.tooltipCloseColor};
            cursor: pointer;
            background: transparent;
            border: none;
          ">
          &times;
        </button>
      </div>`;

      let hotspotBlockDivStart = `<div class="tooltip-body" style="
          display: ${stepContent.tooltipSelectedLayout !== 0 ? "flex" : ""};
          justify-content: ${
            stepContent.tooltipSelectedLayout !== 0 ? "space-evenly" : ""
          };
          flex-direction:${
            stepContent.tooltipSelectedLayout === 2 ? "row-reverse" : "column"
          };">`;

      let hotspotImageBlockStart = `<div
          style="
            padding: 2px;
            display: ${stepContent !== 0 ? "flex" : ""};
            flex-direction: ${stepContent !== 0 ? "column" : ""};"
        >`;

      let hotspotNonImageBlockStart = `<div style=" padding:2px ">`;

      let hotspotNextButtonHtml = `<div 
          style="
          width: 100%;
          display: flex;
          flex-direction: row-reverse;">
            <button
              id="ul-product-tour-next-button"
              style="
                cursor: pointer;
                height: 30%;
                margin-top: 2%;
                background-color: #876afb44;
                color: black;
                border-radius: 5px;
                border: 1px solid white;
                padding: 3px;
                width: 90px;
                font-size: 21px;"
              >
             ${isLastStep ? "Close" : "Next"}
            </button>
          </div>`;

      let nonImageBlocksHtml = stepContent.block
        .map((block) =>
          iframeHandlerFunctions.productTour.createBlocksForTooltip(block)
        )
        .join("");

      let imageBlocksHtml = stepContent.block
        .map((block) => {
          if (block.type === "Image") {
            return iframeHandlerFunctions.productTour.modalBlocks.createImageBlock(
              block
            );
          } else {
            return "";
          }
        })
        .join("");

      let finalHtml =
        hotspotMainHtml +
        hotspotIconDivStart +
        hotspotIconSvg +
        // hotspotArrow +
        closingDivTag +
        hotspotBodyHtml +
        hotspotCloseBtn +
        hotspotBlockDivStart +
        hotspotImageBlockStart +
        imageBlocksHtml +
        closingDivTag +
        hotspotNonImageBlockStart +
        nonImageBlocksHtml +
        closingDivTag +
        closingDivTag +
        hotspotNextButtonHtml +
        closingDivTag +
        closingDivTag;

      productTourDocument.body.innerHTML = finalHtml;
      iframeHandlerFunctions.productTour.setTooltipLayout(
        stepContent,
        productTourDocument,
        ulConstants.productTourData.templates.hotspot
      );
      iframeHandlerFunctions.productTour.hotspotToggleHandler(
        product_tour_id,
        stepContent
      );
      iframeHandlerFunctions.productTour.createProductTourListeners(
        product_tour_id,
        stepToBeShown,
        isLastStep
      );
    },
    hotspotToggleHandler: (product_tour_id, stepContent) => {
      let productTourIframe = document.getElementById(
        `ul-product-tour-${product_tour_id}`
      );
      let productTourDocument =
        productTourIframe.contentDocument ||
        productTourIframe.contentWindow.document;
      let hotspotIcon = productTourDocument.getElementById("ul-hotspot-icon");
      let hotspotBody = productTourDocument.getElementById("modal-content");
      let { left: iconLeft, top: iconTop } =
        hotspotIcon.getBoundingClientRect();

      hotspotIcon?.addEventListener("click", () => {
        let currentOpacity = Number(hotspotBody?.style.opacity);
        productTourIframe.style.height =
          currentOpacity === 1
            ? `${hotspotIcon.clientHeight}px`
            : `${Math.max(
                document.body.clientHeight,
                ulConstants.screen.height
              )}px`;
        productTourIframe.style.width =
          currentOpacity === 1
            ? `${hotspotIcon.clientWidth}px`
            : `${document.body.clientWidth}px`;

        productTourIframe.style.left =
          currentOpacity === 1 ? `${iconLeft}px` : `${0}px`;
        productTourIframe.style.top =
          currentOpacity === 1 ? `${iconTop}px` : `${0}px`;
        if (currentOpacity === 1) {
          hotspotIcon.style.position = "fixed";
          hotspotIcon.style.top = 0;
          hotspotIcon.style.left = 0;
          productTourDocument.body.style.background = "none";
        }
        if (currentOpacity === 0) {
          hotspotIcon.style.position = "";
          hotspotIcon.style.top = `${iconTop}px`;
          hotspotIcon.style.left = `${iconLeft}px`;
          productTourDocument.body.style.background = "none";
          productTourDocument.body.style.background = `${stepContent.backdropColor}44`;
        }
        hotspotBody.style.opacity = currentOpacity === 0 ? 1 : 0;
      });
    },
    createBlocksForModal: (block) => {
      switch (block.type) {
        case ulConstants.productTourData.blocks.title: {
          return iframeHandlerFunctions.productTour.modalBlocks.createTitleBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.text: {
          return iframeHandlerFunctions.productTour.modalBlocks.createTextBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.iframe: {
          return iframeHandlerFunctions.productTour.modalBlocks.createIframeBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.emoji: {
          return iframeHandlerFunctions.productTour.modalBlocks.createEmojiBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.button: {
          return iframeHandlerFunctions.productTour.modalBlocks.createButtonBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.code: {
          return iframeHandlerFunctions.productTour.modalBlocks.createCodeBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.separator: {
          return iframeHandlerFunctions.productTour.modalBlocks.createSeparatorBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.link: {
          return iframeHandlerFunctions.productTour.modalBlocks.createLinkBlock(
            block
          );
        }
        default: {
          return "";
        }
      }
    },
    modalBlocks: {
      createTitleBlock: (block) => {
        return `<p
                style="
                  color: ${block.color};
                  margin: 0 0 0 0 ;
                  font-size: ${Number(block.fontSize)}px;
                  font-weight: ${block.Bold === true ? "bold" : "normal"};
                  font-style: ${block.Italic === true ? "italic" : "normal"};
                  font-family: ${
                    block.fontFamily ? block.fontFamily : "system-ui"
                  };
               ">
              ${userloveMethods.common.attributeToValue(block.text)}
              </p>`;
      },
      createTextBlock: (block) => {
        return ` <p
              style="
                color: ${block.descriptionColor};
                font-size: ${block.descriptionFontSize}px ;
                margin: 0 0 0 0;
                font-family: ${
                  block.descriptionFontFamily
                    ? block.descriptionFontFamily
                    : "system-ui"
                };
              "
            >
              ${userloveMethods.common.attributeToValue(block.description)}
            </p>`;
      },
      createIframeBlock: (block) => {
        return `
          <iframe style="margin-top: 2%;
                        border: none;"
                          allow=${
                            block.iframeCamera === true ? "Camera" : ""
                          };${
          block.iframemicrophone === true ? "Microphone" : ""
        }
                          src=${block.iframeUrl}?${
          block.iframeAutoplay === true ? "autoplay=1" : ""
        }&mute=1
                          width=${block.iframewidth}
                          height=${block.iframeHeight}
                        ></iframe>`;
      },
      createEmojiBlock: (block) => {
        return `<div style="font-size:50px">
                    ${block.emoji}
                  /div>`;
      },
      createButtonBlock: (block) => {
        return `
          <div style="
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
             ">
          <button
            style="
              cursor: pointer;
              height: 30%;
              margin-top: 2%;
              background-color: ${
                block.buttonClassProperty === "Filled"
                  ? block.buttonBackground
                  : "transparent"
              };
              color: ${block.buttonTextColor};
              border-radius: ${block.buttonBorderRadius}px;
              border: 1px solid ${block.buttonBackground};
              padding: 3px;
              font-family: ${block.buttonFontFamily};
              width: ${
                block.buttonFullWidth
                  ? "100%"
                  : block.buttonSizeProperty === "L"
                  ? "75%"
                  : block.buttonSizeProperty === "M"
                  ? "50%"
                  : "20%"
              };
              font-size: 21px;
            "
          >
         ${
           block.buttonLinkType === "URL"
             ? `
             <a
               href=${block.buttonLinkURL};
               target=${block.buttonOpenLinkNewTab ? "_blank" : "_self"}; 
               style="
                 text-decoration: none;
                 font-family: ${block.buttonFontFamily};
                 color: ${block.buttonTextColor};
               "
             >
               Next
             </a>
           `
             : ` Next`
         }       
          </button>
          </div>
          `;
      },
      createCodeBlock: (block) => {
        return `<div
          class="gs-code-area-preview">
          ${block.codeAreaContent}</div>`;
      },
      createSeparatorBlock: (block) => {
        return `<hr style="width: 100%;
                    border: transparent;
                    border-top:
                      ${block.SeparatorHeight}px
                        ${block.separatordotted === true ? "dotted" : "solid"}${
          block.SeparatorBackgroundColor
        };
                    margin: ${block.SeparatorSpacing}px 0px;"
                  />`;
      },
      createLinkBlock: (block) => {
        return `<a style="
                      display:flex;
                      justify-content: center;
                      margin-top: 2%;
                      width: 100%;
                      border: none"
                      href=${block.link}
                      target="_blank"
                      >
                      ${block.link}
                  </a>`;
      },
      createImageBlock: (block) => {
        let imageHref = "";
        if (block.imageUrl) {
          imageHref = `href=${block.Url}`;
        } else if (block.imageEmail) {
          imageHref = `href=mailto:${block.Url}?subject=subject&`;
        } else if (block.imagePhone) {
          imageHref = `href=tel:${block.Url}`;
        }
        return `<a ${imageHref} target="${
          block.UrlTarget ? "_blank" : "_self"
        }"><img style="
              width:${Number(block.imageWidth)}px;
              border-radius:${Number(block.imageRadius)}px;
              padding:10px;"
            src=${block.image}
            alt=${block.alternative}
          />
          </a>`;
      },
    },
    createBlocksForTooltip: (block) => {
      switch (block.type) {
        case ulConstants.productTourData.blocks.title: {
          return iframeHandlerFunctions.productTour.tooltipBlocks.createTitleBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.text: {
          return iframeHandlerFunctions.productTour.tooltipBlocks.createTextBlock(
            block
          );
        }
        case ulConstants.productTourData.blocks.button: {
          return iframeHandlerFunctions.productTour.tooltipBlocks.createButtonBlock(
            block
          );
        }
        default: {
          return "";
        }
      }
    },
    tooltipBlocks: {
      createTextBlock: (block) => {
        return `<p style="
                        word-wrap: break-word;
                        color: ${block.tooltipDescriptionColor};
                        font-size: ${block.tooltipDescriptionFontSize}px ;
                        margin-top: 2%;
                        font-family: ${block.tooltipDescriptionFontFamily};"
                  >
                    ${userloveMethods.common.attributeToValue(
                      block.tooltipDescription
                    )}
                  </p>`;
      },

      createTitleBlock: (block) => {
        return `<p
                style="
                  color: ${block.tooltipTitleColor};
                  margin: 0%;
                  font-size: ${Number(block.tooltipTitleFontSize)}px;
                  font-weight: ${
                    block.tooltipTitleBold === true ? "bold" : "normal"
                  };
                  font-style: ${
                    block.tooltipTitleItalic === true ? "italic" : "normal"
                  };
                  font-family: ${block.tooltipTitleFontFamily};
               ">
                ${userloveMethods.common.attributeToValue(block.tooltipTitle)}
              </p>`;
      },

      createButtonBlock: (block) => {
        return `
              <div style="
                width: 100%;
                display: flex;
                flex-direction: row-reverse;
                 ">
              <button
                style="
                  cursor: pointer;
                  height: 30%;
                  margin-top: 2%;
                  background-color: ${
                    block.tooltipButtonClassProperty === "Filled"
                      ? block.tooltipButtonBackground
                      : "transparent"
                  };
                  color: ${block.tooltipButtonTextColor};
                  border-radius: ${block.tooltipButtonBorderRadius}px;
                  border: 1px solid ${block.tooltipButtonBackground};
                  padding: 3px;
                  font-family: ${block.tooltipButtonFontFamily};
                  width: ${
                    block.tooltipButtonFullWidth
                      ? "100%"
                      : block.tooltipButtonSizeProperty === "L"
                      ? "75%"
                      : block.tooltipButtonSizeProperty === "M"
                      ? "50%"
                      : "20%"
                  };
                  font-size: 21px;
                "
              >
             ${
               block.tooltipButtonLinkType === "URL"
                 ? `
                 <a
                   href=${block.tooltipButtonLinkURL};
                   target=${
                     block.tooltipButtonOpenLinkNewTab ? "_blank" : "_self"
                   }; 
                   style="
                     text-decoration: none;
                     font-family: ${block.tooltipButtonFontFamily};
                     color: ${block.tooltipButtonTextColor};
                   "
                 >
                   Next
                 </a>
               `
                 : ` Next`
             }
              
             
              </button>
              </div
              `;
      },

      createImageBlock: (block) => {
        let tooltipImageHref = "";
        if (block.tooltipImageUrl) {
          tooltipImageHref = `href=${block.Url}`;
        } else if (block.tooltipImageEmail) {
          tooltipImageHref = `href=mailto:${block.Url}?subject=subject&`;
        } else if (block.tooltipImagePhone) {
          tooltipImageHref = `href=tel:${block.Url}`;
        }
        return `<a ${tooltipImageHref} target="${
          block.UrlTarget ? "_blank" : "_self"
        }"><img style="
              width:${Number(block.tooltipImageWidth)}px;
              border-radius:${Number(block.tooltipImageRadius)}px;
              padding:10px;"
            src=${block.tooltipImage}
            alt=${block.alternative}
          />
          </a>`;
      },
    },
    createProductTourListeners: (
      product_tour_id,
      stepToBeShown,
      isLastStep
    ) => {
      let productTourIframe = document.getElementById(
        `ul-product-tour-${product_tour_id}`
      );
      let productTourDocument =
        productTourIframe.contentDocument ||
        productTourIframe.contentWindow.document;
      let stepContent = JSON.parse(stepToBeShown.step_content)[0];

      //add listener for close button
      if (stepContent.overlay_click) {
        productTourDocument.addEventListener("click", (event) => {
          if (event.target.tagName === "BODY") {
            //go to next step
            iframeHandlerFunctions.productTour.nextButtonEventListener(
              stepToBeShown,
              product_tour_id,
              isLastStep
            );
          }
        });
      }

      let closeBtn = productTourDocument.getElementById(
        "ul-product-tour-close-btn"
      );
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          iframeHandlerFunctions.productTour.nextButtonEventListener(
            stepToBeShown,
            product_tour_id,
            isLastStep
          );
        });
      }
      //add listener to next button
      let nextButton = productTourDocument.getElementById(
        "ul-product-tour-next-button"
      );

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          iframeHandlerFunctions.productTour.nextButtonEventListener(
            stepToBeShown,
            product_tour_id,
            isLastStep
          );
        });
      }
    },
    nextButtonEventListener: (stepToBeShown, product_tour_id, isLastStep) => {
      let currentStepIndex = stepToBeShown.step_index;
      let currentProductTour = LiveProductTours.find(
        (productTour) => productTour.product_tour_id === product_tour_id
      );

      if (!isLastStep) {
        let nextStep = currentProductTour.product_tour_steps.find(
          (step) => step.step_index === currentStepIndex + 1
        );
        userlove.track({
          event: ulConstants.events.productTour.productTourStepSeen,
          data: {
            product_tour_id,
            seen_step: {
              product_tour_step_id: stepToBeShown.product_tour_step_id,
              step_index: stepToBeShown.step_index,
            },
          },
        });
        iframeHandlerFunctions.productTour.createStepContent(
          nextStep,
          product_tour_id
        );
      } else {
        /*call event ul_product_tour_completed when last step has been seen 
          and user completes the product tour*/
        userlove.track({
          event: ulConstants.events.productTour.productTourCompleted,
          data: {
            product_tour_id,
            last_step: {
              product_tour_step_id: stepToBeShown.product_tour_step_id,
              step_index: stepToBeShown.step_index,
            },
          },
        });
        iframeHandlerFunctions.productTour.removeProductTourIframe(
          product_tour_id
        );
      }
    },
    removeProductTourIframe: (product_tour_id) => {
      let productTourIframe = document.getElementById(
        `ul-product-tour-${product_tour_id}`
      );
      if (productTourIframe) {
        document.body.removeChild(productTourIframe);
      }
    },
    getProductHotspotSvg: (tooltipTopIcon) => {
      switch (tooltipTopIcon) {
        case "target": {
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        }
        case "help": {
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.08984 8.99996C9.32495 8.33163 9.789 7.76807 10.3998 7.40909C11.0106 7.05012 11.7287 6.9189 12.427 7.03867C13.1253 7.15844 13.7587 7.52148 14.2149 8.06349C14.6712 8.60549 14.9209 9.29148 14.9198 9.99996C14.9198 12 11.9198 13 11.9198 13" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17H12.01" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            `;
        }
        case "alert": {
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8V12" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16H12.01" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        }
        case "bell": {
          return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.7295 21C13.5537 21.3031 13.3014 21.5547 12.9978 21.7295C12.6941 21.9044 12.3499 21.9965 11.9995 21.9965C11.6492 21.9965 11.3049 21.9044 11.0013 21.7295C10.6977 21.5547 10.4453 21.3031 10.2695 21" stroke="#866AFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        }
        default: {
          return "";
        }
      }
    },
    getProductTourProgress: (product_tour_id) => {
      //get number of steps in live product tour.
      let totalSteps = LiveProductTours.find(
        (tour) => tour.product_tour_id === product_tour_id
      )?.product_tour_steps?.length;
      //get number of steps in product tour progress.
      //get feature progress of product tour.
      let productTourProgress =
        ulPageData.triggeredFlowsForThisPage.productTours.find(
          (tour) => tour.product_tour_id === product_tour_id
        );
      let completedSteps = productTourProgress?.seen_steps || [];
      let progressInPercent = (completedSteps?.length * 100) / totalSteps;
      return progressInPercent;
    },
    getSlideUpPosition: (stepContent, slideUp) => {
      let initialMargin = {};
      let finalMargin = {};
      let slideUpHeight = slideUp.clientHeight;
      let slideUpWidth = slideUp.clientWidth;
      let transition = "";
      if (stepContent.slideupView === 1) {
        finalMargin["top"] = `${slideUpHeight / 2 + 10}px`;
        finalMargin["left"] = `${slideUpWidth / 2 + 10}px`;
        transition = "margin-left 0.5s ease-in-out";
      } else if (stepContent.slideupView === 2) {
        finalMargin["left"] = `50vw`;
        finalMargin["top"] = `${slideUpHeight / 2 + 10}px`;
        transition = "margin-top 0.5s ease-in-out";
      } else if (stepContent.slideupView === 3) {
        initialMargin["top"] = finalMargin["top"] = `${
          slideUpHeight / 2 + 10
        }px`;
        initialMargin["left"] = `${2 * ulConstants.screen.width}px`;
        finalMargin["left"] = `${
          ulConstants.screen.width - slideUpWidth / 2 - 10
        }px`;
        transition = "margin-left 0.5s ease-in-out";
      } else if (stepContent.slideupView === 4) {
        finalMargin["top"] = "50vh";
        finalMargin["left"] = `${slideUpWidth / 2 + 10}px`;
        transition = "margin-left 0.5s ease-in-out";
      } else if (stepContent.slideupView === 5) {
        finalMargin["top"] = `50vh`;
        finalMargin["left"] = `50vw`;
        transition = "margin-left 0.5s ease-in-out";
      } else if (stepContent.slideupView === 6) {
        initialMargin["left"] = `${ulConstants.screen.width * 2}px`;
        finalMargin["top"] = initialMargin["top"] = `50vh`;
        finalMargin["left"] = `${
          ulConstants.screen.width - slideUpWidth / 2 - 10
        }px`;
        transition = "margin-left 0.5s ease-in-out";
      } else if (stepContent.slideupView === 7) {
        finalMargin["left"] = `${slideUpWidth / 2 + 10}px`;
        finalMargin["top"] = `${
          ulConstants.screen.height - slideUpHeight / 2 - 10
        }px`;
        transition = "margin-left 0.5s ease-in-out";
      } else if (stepContent.slideupView === 8) {
        initialMargin["left"] = finalMargin["left"] = `50vw`;
        initialMargin["top"] = `${ulConstants.screen.height * 2}px`;
        finalMargin["top"] = `${
          ulConstants.screen.height - slideUpHeight / 2 - 10
        }px`;
        transition = "margin-top 0.5s ease-in-out";
      } else if (stepContent.slideupView === 9) {
        finalMargin["left"] = `${
          ulConstants.screen.width - slideUpWidth / 2 - 10
        }px`;
        initialMargin["left"] = `${ulConstants.screen.width * 2}px`;
        initialMargin["top"] = finalMargin["top"] = `${
          ulConstants.screen.height - slideUpHeight / 2 - 10
        }px`;
        transition = "margin-left 0.5s ease-in-out";
      }
      return { initialMargin, finalMargin, transition };
    },
    getPositionBySelector: (selector, view, template) => {
      let tooltipLeft = 0,
        tooltipTop = 0;
      let element = document.querySelector(selector);
      if (!element) {
        return {};
      }
      let { width, top, left, height } = element.getBoundingClientRect();
      if (template === ulConstants.productTourData.templates.tooltip) {
        if (view === 1 || view === 2 || view === 3) {
          tooltipTop = height + top;
          tooltipLeft = left + width / 2 - 15;
        } else if (view === 4 || view === 5 || view === 6) {
          tooltipTop = height / 2 + top;
          tooltipLeft = left - 25;
        } else if (view === 7 || view === 8 || view === 9) {
          tooltipTop = top - 15;
          tooltipLeft = left + width / 2 - 15;
        } else if (view === 10 || view === 11 || view === 12) {
          tooltipTop = top + height / 2;
          tooltipLeft = width + left;
        }
      } else if (template === ulConstants.productTourData.templates.hotspot) {
        if (view === 1 || view === 2 || view === 3) {
          tooltipTop = height + top - 24;
          tooltipLeft = left + width / 2 - 15;
        } else if (view === 4 || view === 5 || view === 6) {
          tooltipTop = height / 2 + top - 12;
          tooltipLeft = left + width / 2 - 12;
        } else if (view === 7 || view === 8 || view === 9) {
          tooltipTop = top;
          tooltipLeft = left + width / 2 - 15;
        } else if (view === 10 || view === 11 || view === 12) {
          tooltipTop = top;
          tooltipLeft = width / 2 + left - 24;
        }
      }

      return { tooltipLeft, tooltipTop };
    },
    setTooltipLayout: (stepContent, iframeDoc, template) => {
      let tooltipDiv = iframeDoc.getElementById("modal-content");
      let tooltipIconSvg = iframeDoc.getElementById("gs-tooltip-arrow");
      let { height: totalHeight, width: totalWidth } =
        tooltipDiv.getBoundingClientRect();
      let tooltipIconMarginLeft =
        ((stepContent.view === 10 ||
          stepContent.view === 11 ||
          stepContent.view === 12) &&
        stepContent.tooltipTopIcon !== ""
          ? 14
          : stepContent.view === 10 ||
            stepContent.view === 11 ||
            stepContent.view === 12
          ? 3
          : (stepContent.view === 4 ||
              stepContent.view === 5 ||
              stepContent.view === 6) &&
            stepContent.tooltipTopIcon !== ""
          ? -1
          : 3) + "px";

      let tooltipIconMarginTop =
        (stepContent.view === 7 ||
        stepContent.view === 8 ||
        stepContent.view === 9
          ? -15
          : stepContent.view === 10 ||
            stepContent.view === 11 ||
            stepContent.view === 12
          ? -10
          : stepContent.view === 4 ||
            stepContent.view === 5 ||
            stepContent.view === 6
          ? -7
          : 0) + "px";

      let tooltipArrowTop =
        ((stepContent.view === 7 ||
          stepContent.view === 8 ||
          stepContent.view === 9) &&
        stepContent.tooltipTopIcon !== ""
          ? -37
          : stepContent.view === 7 ||
            stepContent.view === 8 ||
            stepContent.view === 9
          ? -19
          : stepContent.view === 10 ||
            stepContent.view === 11 ||
            stepContent.view === 12
          ? -10
          : stepContent.view === 4 ||
            stepContent.view === 5 ||
            stepContent.view === 6
          ? -7
          : stepContent.tooltipTopIcon !== ""
          ? 20
          : 0) + "px";

      let tooltipArrowTransform =
        stepContent.view === 7 ||
        stepContent.view === 8 ||
        stepContent.view === 9
          ? "rotate(180deg)"
          : stepContent.view === 10 ||
            stepContent.view === 11 ||
            stepContent.view === 12
          ? "rotate(270deg)"
          : stepContent.view === 4 ||
            stepContent.view === 5 ||
            stepContent.view === 6
          ? "rotate(90deg)"
          : "rotate(0deg)";

      let tooltipArrowLeft =
        ((stepContent.view === 10 ||
          stepContent.view === 11 ||
          stepContent.view === 12) &&
        stepContent.tooltipTopIcon !== ""
          ? 29
          : stepContent.view === 10 ||
            stepContent.view === 11 ||
            stepContent.view === 12
          ? 8
          : (stepContent.view === 4 ||
              stepContent.view === 5 ||
              stepContent.view === 6) &&
            stepContent.tooltipTopIcon !== ""
          ? -28
          : stepContent.view === 4 ||
            stepContent.view === 5 ||
            stepContent.view === 6
          ? -8
          : 0) + "px";

      let tooltipModalContentTop =
        ((stepContent.view === 7 ||
          stepContent.view === 8 ||
          stepContent.view === 9) &&
        stepContent.tooltipTopIcon !== ""
          ? -totalHeight - 32
          : stepContent.view === 7 ||
            stepContent.view === 8 ||
            stepContent.view === 9
          ? -totalHeight - 13
          : stepContent.view === 10 || stepContent.view === 6
          ? -totalHeight + 3 * 15 - 11
          : stepContent.view === 11 || stepContent.view === 5
          ? 15 - totalHeight / 2 - 11
          : stepContent.view === 12 || stepContent.view === 4
          ? -25
          : stepContent.tooltipTopIcon !== ""
          ? 40
          : 20) + "px";

      let tooltipModalContentLeft =
        (stepContent.view === 1 || stepContent.view === 9
          ? -15
          : stepContent.view === 2 || stepContent.view === 8
          ? 15 - totalWidth / 2
          : stepContent.view === 3 || stepContent.view === 7
          ? -totalWidth + 3 * 15
          : (stepContent.view === 10 ||
              stepContent.view === 11 ||
              stepContent.view === 12) &&
            stepContent.tooltipTopIcon !== ""
          ? 2 * 15 + 21
          : stepContent.view === 10 ||
            stepContent.view === 11 ||
            stepContent.view === 12
          ? 2 * 15
          : (stepContent.view === 4 ||
              stepContent.view === 5 ||
              stepContent.view === 6) &&
            stepContent.tooltipTopIcon !== ""
          ? -totalWidth - 20
          : stepContent.view === 4 ||
            stepContent.view === 5 ||
            stepContent.view === 6
          ? -totalWidth
          : 15 - totalWidth / 2) + "px";

      tooltipDiv.style.opacity = "1";
      tooltipDiv.style.top = tooltipModalContentTop;
      tooltipDiv.style.left = tooltipModalContentLeft;
      if (template === ulConstants.productTourData.templates.tooltip) {
        tooltipIconSvg.style.top = tooltipArrowTop;
        tooltipIconSvg.style.left = tooltipArrowLeft;
        tooltipIconSvg.style.transform = tooltipArrowTransform;
      } else if (template === ulConstants.productTourData.templates.hotspot) {
        tooltipIconSvg.style.marginTop = tooltipIconMarginTop;
        tooltipIconSvg.style.marginLeft = tooltipIconMarginLeft;
      }
    },
  },
  // functions to handle user interaction with NPS iframe.
  nps: {
    createNpsListeners: (nps, nps_question) => {
      let npsIframe = document.getElementById(`ul-nps-${nps.nps_id}`);

      let npsDocument =
        npsIframe.contentDocument || npsIframe.contentWindow.document;

      let dismissButton = npsDocument.getElementById("ul-nps-custom-dismiss");

      if (dismissButton) {
        dismissButton.addEventListener("click", () => {
          userlove.hideNPS({
            nps_id: nps.nps_id,
            nps_question: nps_question,
          });
        });
      }

      let answerButton = npsDocument.getElementsByClassName(
        `ul-nps-score-button-${nps.nps_id}`
      );

      if (answerButton) {
        // add event listerner on score buttons
        for (let i = 0; i < answerButton.length; i++) {
          answerButton[i].addEventListener("click", () => {
            let npsAnswerData = answerButton[i];
            npsAnswerData = JSON.parse(npsAnswerData.value);

            userloveMethods.nps.conditionMethods.npsQuestionCompleted(
              npsAnswerData,
              nps_question
            );
            let nextNpsQuestion = nps.nps_question.find(
              (q) => q.sort_order === nps_question.sort_order + 1
            );
            if (nextNpsQuestion) {
              iframeHandlerFunctions.nps.createNpsQuestion(
                nextNpsQuestion,
                nps
              );
            }
          });

          let value = Number(answerButton[i].dataset.value);

          answerButton[i].addEventListener("mouseover", () => {
            for (let j = 0; j < answerButton.length; j++) {
              let val = Number(answerButton[j].dataset.value);
              if (val < value) {
                answerButton[j].classList.add("ul-score-button-box-hovered");
              }
            }
          });

          answerButton[i].addEventListener("mouseout", () => {
            for (let j = 0; j < answerButton.length; j++) {
              let val = Number(answerButton[j].dataset.value);

              if (val < value) {
                answerButton[j].classList.remove("ul-score-button-box-hovered");
              }
            }
          });
        }
      }

      //   checkboxBlock.addEventListener("click",() => {})

      let checkbox = npsDocument.getElementsByClassName(
        `ul-nps-multi-choice-answer-${nps.nps_id}`
      );
      let continueBtn = npsDocument.getElementById(
        `continue-button-${nps.nps_id}`
      );
      let multiAnswerArr = [];
      let answerData = {};

      if (checkbox) {
        // add listner on checkbox
        let checkboxBlock = npsDocument.getElementsByClassName(
          `ul-multiple-button-checkbox`
        );

        if (checkboxBlock) {
          for (let i = 0; i < checkboxBlock.length; i++) {
            checkboxBlock[i].addEventListener("click", () => {
              const input = checkboxBlock[i].querySelector("div input");
              input.checked = !input.checked;
              let parsedData = JSON.parse(input.value);

              if (input.checked) {
                multiAnswerArr.push(parsedData.answer);
                continueBtn.disabled = false;
                answerData = {
                  ...parsedData,
                  answer: multiAnswerArr,
                };
                continueBtn.disabled = false;
              } else {
                multiAnswerArr = multiAnswerArr.filter(
                  (answer) => answer !== parsedData.answer
                );
                answerData = {
                  ...parsedData,
                  answer: multiAnswerArr,
                };

                if (multiAnswerArr.length === 0) {
                  continueBtn.disabled = true;
                }
              }
            });
          }
        }
        for (let i = 0; i < checkbox.length; i++) {
          checkbox[i].addEventListener("click", (e) => {
            e.stopPropagation();
            let parsedData = JSON.parse(checkbox[i].value);
            if (checkbox[i].checked) {
              multiAnswerArr.push(parsedData.answer);
              continueBtn.disabled = false;
              answerData = {
                ...parsedData,
                answer: multiAnswerArr,
              };
            } else {
              multiAnswerArr = multiAnswerArr.filter(
                (answer) => answer !== parsedData.answer
              );
              answerData = {
                ...parsedData,
                answer: multiAnswerArr,
              };

              if (multiAnswerArr.length === 0) {
                continueBtn.disabled = true;
              }
            }
          });
        }
        if (continueBtn) {
          continueBtn.addEventListener("click", () => {
            userloveMethods.nps.conditionMethods.npsQuestionCompleted(
              answerData,
              nps_question
            );
            let nextNpsQuestion = nps.nps_question.find(
              (q) => q.sort_order === nps_question.sort_order + 1
            );
            if (nextNpsQuestion) {
              iframeHandlerFunctions.nps.createNpsQuestion(
                nextNpsQuestion,
                nps
              );
            }
          });
        }
      }
      let callToActionButton = npsDocument.getElementById(
        `call-to-action-button-${nps.nps_id}`
      );

      if (callToActionButton) {
        callToActionButton.addEventListener("click", () => {
          let answerData = JSON.parse(callToActionButton.dataset.value);

          userloveMethods.nps.conditionMethods.npsQuestionCompleted(
            answerData,
            nps_question
          );
          let nextNpsQuestion = nps.nps_question.find(
            (q) => q.sort_order === nps_question.sort_order + 1
          );
          if (nextNpsQuestion) {
            iframeHandlerFunctions.nps.createNpsQuestion(nextNpsQuestion, nps);
          }
        });
      }

      let continuebtnForPanel = npsDocument.getElementById(
        `ul-nps-introduction-panel-${nps.nps_id}`
      );

      if (continuebtnForPanel) {
        continuebtnForPanel.addEventListener("click", () => {
          let answerData = JSON.parse(continuebtnForPanel.value);

          userloveMethods.nps.conditionMethods.npsQuestionCompleted(
            answerData,
            nps_question
          );
          let nextNpsQuestion = nps.nps_question.find(
            (q) => q.sort_order === nps_question.sort_order + 1
          );
          if (nextNpsQuestion) {
            iframeHandlerFunctions.nps.createNpsQuestion(nextNpsQuestion, nps);
          }
        });
      }

      let continueBtnForOpen = npsDocument.getElementById(
        `continue-button-open-question-${nps.nps_id}`
      );

      let textAreaForOpenQuestion = npsDocument.getElementById(
        `ul-open-question-textarea`
      );

      if (textAreaForOpenQuestion) {
        textAreaForOpenQuestion.addEventListener("keyup", () => {
          if (textAreaForOpenQuestion.value === "") {
            continueBtnForOpen.disabled = true;
          } else {
            continueBtnForOpen.disabled = false;
          }
        });
      }

      if (continueBtnForOpen) {
        continueBtnForOpen.addEventListener("click", () => {
          let answerData = JSON.parse(continueBtnForOpen.value);
          userloveMethods.nps.conditionMethods.npsQuestionCompleted(
            answerData,
            nps_question
          );
          let nextNpsQuestion = nps.nps_question.find(
            (q) => q.sort_order === nps_question.sort_order + 1
          );
          if (nextNpsQuestion) {
            iframeHandlerFunctions.nps.createNpsQuestion(nextNpsQuestion, nps);
          }
        });
      }
      let yesBtn = npsDocument.getElementById(`yes-btn-${nps.nps_id}`);
      let noBtn = npsDocument.getElementById(`no-btn-${nps.nps_id}`);

      if (yesBtn) {
        yesBtn.addEventListener("click", () => {
          let answerData = JSON.parse(yesBtn.value);
          userloveMethods.nps.conditionMethods.npsQuestionCompleted(
            answerData,
            nps_question
          );
          let nextNpsQuestion = nps.nps_question.find(
            (q) => q.sort_order === nps_question.sort_order + 1
          );
          if (nextNpsQuestion) {
            iframeHandlerFunctions.nps.createNpsQuestion(nextNpsQuestion, nps);
          }
        });
      }
      if (noBtn) {
        noBtn.addEventListener("click", () => {
          let answerData = JSON.parse(noBtn.value);
          userloveMethods.nps.conditionMethods.npsQuestionCompleted(
            answerData,
            nps_question
          );
          let nextNpsQuestion = nps.nps_question.find(
            (q) => q.sort_order === nps_question.sort_order + 1
          );
          if (nextNpsQuestion) {
            iframeHandlerFunctions.nps.createNpsQuestion(nextNpsQuestion, nps);
          }
        });
      }

      let continueBtnForContact = npsDocument.getElementById(
        `continue-button-contact-information-question-${nps.nps_id}`
      );
      if (continueBtnForContact) {
        continueBtnForContact.addEventListener("click", () => {
          let answerData = JSON.parse(continueBtnForContact.value);
          answerData.answer = {};
          nps_question.question_json.fieldData.forEach((data) => {
            let input = npsDocument.getElementById(
              `ul-nps-input-${data.fieldKey}`
            );

            answerData.answer[data.fieldKey] = input.value;
          });
          userloveMethods.nps.conditionMethods.npsQuestionCompleted(
            answerData,
            nps_question
          );
          let nextNpsQuestion = nps.nps_question.find(
            (q) => q.sort_order === nps_question.sort_order + 1
          );
          if (nextNpsQuestion) {
            iframeHandlerFunctions.nps.createNpsQuestion(nextNpsQuestion, nps);
          }
        });
      }
      let contactFormInputs = npsDocument.querySelectorAll(
        ".ul-contact-information-input-box input"
      );
      if (contactFormInputs) {
        for (let i = 0; i < contactFormInputs.length; i++) {
          let input = contactFormInputs[i];

          input.addEventListener("keyup", () => {
            let formReadyToSubmit = true;
            for (let j = 0; j < contactFormInputs.length; j++) {
              if (contactFormInputs[j].type === "email" && i === j) {
                const emailRegex = new RegExp(/\S+@\S+\.\S+/);
                if (
                  !contactFormInputs[j].value ||
                  emailRegex.test(contactFormInputs[j].value)
                ) {
                  contactFormInputs[j].classList.remove("error");
                  formReadyToSubmit = true;
                } else {
                  contactFormInputs[j].classList.add("error");
                  formReadyToSubmit = false;
                }
              } else if (contactFormInputs[j].type === "tel" && i === j) {
                const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
                if (
                  !contactFormInputs[j].value ||
                  (phoneRegex.test(contactFormInputs[j].value) &&
                    contactFormInputs[j].value.length >= 7)
                ) {
                  contactFormInputs[j].classList.remove("error");
                  formReadyToSubmit = true;
                } else {
                  contactFormInputs[j].classList.add("error");
                  formReadyToSubmit = false;
                }
              }
              if (contactFormInputs[j].required) {
                formReadyToSubmit =
                  formReadyToSubmit && contactFormInputs[j].value !== "";
              }
            }
            continueBtnForContact.disabled = !formReadyToSubmit;
          });
        }
        // continueBtnForContact.disabled = formReadyToSubmit;
      }
      let starRatingBtn = npsDocument.getElementsByClassName("ul-star-rating");
      if (starRatingBtn) {
        for (let i = 0; i < starRatingBtn.length; i++) {
          starRatingBtn[i].addEventListener("click", () => {
            let answerData = JSON.parse(starRatingBtn[i].value);

            userloveMethods.nps.conditionMethods.npsQuestionCompleted(
              answerData,
              nps_question
            );
            let nextNpsQuestion = nps.nps_question.find(
              (q) => q.sort_order === nps_question.sort_order + 1
            );
            if (nextNpsQuestion) {
              iframeHandlerFunctions.nps.createNpsQuestion(
                nextNpsQuestion,
                nps
              );
            }
          });
        }
      }

      let emojiQuestion = npsDocument.getElementsByClassName(`ul-nps-emoji`);
      if (emojiQuestion) {
        for (let i = 0; i < emojiQuestion.length; i++) {
          emojiQuestion[i].addEventListener("click", () => {
            let answerData = JSON.parse(emojiQuestion[i].dataset.number);
            userloveMethods.nps.conditionMethods.npsQuestionCompleted(
              answerData,
              nps_question
            );
            let nextNpsQuestion = nps.nps_question.find(
              (q) => q.sort_order === nps_question.sort_order + 1
            );
            if (nextNpsQuestion) {
              iframeHandlerFunctions.nps.createNpsQuestion(
                nextNpsQuestion,
                nps
              );
            }
          });
        }
      }
    },
    createNpsQuestion: (nps_question, nps) => {
      const styles = `<style>
          * {
            margin: 0;
            overflow: hidden;
          }
          .ul-nps-${nps.nps_id}{
            scale:1;
          }
          .ul-nps-container{
            width:100%;
            display :flex;
            padding:15px;
            box-sizing :border-box;
            flex-direction : column;
            align-items :center;
            text-align :center;
            background-color : ${nps.nps_appearance.background_color};
          }
   
          .ul-nps-branding-logo {
            margin-top: 10px;
          }
  
          .ul-nps-question-box{
            width: 80%;
            font-size: 16px;
            font-weight: 500;
            line-height: 18px;
            color : ${nps.nps_appearance.question_text_color};
            font-family : ${nps.nps_appearance.font};
            margin-bottom: 5px;
          }
          .ul-nps-description-box{
            width: 80%;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            color : ${nps.nps_appearance.description_text_color};
            font-family : ${nps.nps_appearance.font};
          }
          .ul-nps-custom-dismiss {
            display: flex;
            align-self: flex-end;
            justify-content: flex-end;
            cursor: pointer;
          }
          .ul-nps-custom-dismiss svg {
            width: 10px;
            height: 10px;
            padding: 4px;
            fill: ${nps.nps_appearance.close_button_color};
            background-color: ${nps.nps_appearance.close_button_background};
          }
          .ul-score-button-box{
            display: flex;
            justify-content: space-between;
            width: 80%;
            margin-top: 20px;
            gap: 5px;
            height: 38px;
            align-items: center;
            padding: 0 8px;
          }
          .ul-score-button-box button{
            width: 30px;
            height :30px;
            box-sizing :border-box;
            transition : 0.1s all;
            border : 1px solid #0000;
            align-items :center;
            justify-content :center;
            display :flex;
            cursor: pointer;
            border-radius : ${nps.nps_appearance.button_radius}px;
    
            background : ${nps.nps_appearance.button_color};
          }
          .ul-score-button-box button:hover{
            transform : scale(1.15);
            border-radius : ${nps.nps_appearance.button_radius}px !important;
    
            transition : 0.1s all;
          }
  
          .ul-score-button-box-hovered {
            transform : scale(1.15);
            border-radius : ${nps.nps_appearance.button_radius}px !important;
            transition : 0.1s all;
          }
    
          .ul-multiple-choice-button-box {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 0px;
            margin: 20px auto;
            justify-items: center;
            width: 100%;
    
          }
          .ul-multiple-button-checkbox{
            width: calc(100% - 20px);
            height: 48px;
            border: 1px solid #e9e9ef;
            border-radius: 4px;
            display: flex;
            gap: 10px;
            align-items: center;
            padding-left: 10px;
            cursor: pointer
          }
          .ul-nps-custom-input {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .ul-nps-custom-input input[type="checkbox"]{
            cursor: pointer;
            appearance :none;
            background-color : #fff;
            width : 20px;
            height :20px;
            border :2px solid #ccc;
            border-radius : 2px;
            display : inline-grid;
            place-content :center;
          }
  
          .ul-nps-custom-input label{
            margin-left :5px;
            font-family: ${nps.nps_appearance.font};
            font-size: 14px;
            cursor: pointer
          }
          .ul-nps-custom-input input[type="checkbox"]:checked {
            background-color: ${nps.nps_appearance.button_color};
            border: 2px solid ${nps.nps_appearance.button_color};
          }
          .ul-nps-custom-input input[type="checkbox"]::before{
            content: "";
            width: 10px;
            height: 10px;
            transform: scale(0);
            transform-origin: bottom left;
            background-color: #fff;
            clip-path: polygon(13% 50%, 34% 66%, 81% 2%, 100% 18%, 39% 100%, 0 71%);
          }
          .ul-nps-custom-input input[type="checkbox"]::before {
            transform: scale(1);
          }
    
          .ul-check-box-continue {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            
          }
    
          .ul-check-box-continue button{
            font-size: 13px;
            padding: 11px 16px;
            color: white;
            border: none;
            cursor: pointer;
            opacity: 1;
            width: 140px;
            height: 38px;
            background-color: ${
              nps.nps_appearance.button_color
            }; border-radius: ${nps.nps_appearance.button_radius}px;
            margin: 0 auto;
            margin-top: 10px;
          }
          .ul-check-box-continue button:disabled{
            opacity: 0.5;
            cursor : default;
          }
    
          .ul-call-to-action-continue-button {
            font-size: 13px;
            padding: 8px;
            width :140px;  
            color: white;
            border: none;
            cursor: pointer;
            text-decoration :none;
            margin-top: 10px;
            background-color: ${
              nps.nps_appearance.button_color
            }; border-radius: ${nps.nps_appearance.button_radius}px;
          }
          .ul-yes-no-button-box{
            width: 60%;
            display: flex;
            justify-content: space-evenly;
            margin-top: 20px;
            margin-bottom : 15px;
            
          }
          .ul-yes-no-question-btn{
            background: none;
            font-size: 13px;
            padding:4px 14px;
            border-radius:${nps.nps_appearance.button_radius}px;
            width :140px;
            color: #343a40;
            height :40px;
            border: 1px solid #343a40;
            cursor: pointer;
            opacity: 1;
          }
  
          .ul-yes-no-question-btn-highlight {
            background: ${nps.nps_appearance.button_color};
            font-size: 16px;
            padding:4px 14px;
            border-radius:${nps.nps_appearance.button_radius}px;
            width :140px;
            color: white;
            height :40px;
            border: 1px solid ${nps.nps_appearance.button_color};
            cursor: pointer;
            opacity: 1;
          }
  
          .ul-yes-no-question-btn:hover {
              color: #fff;
              background: #343a40;
          }
          
          .ul-contact-information-input-box{
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
          }
          .ul-contact-information-input-box label{
            text-align: left;
            font-size: 14px;
            color: #646f79;
            font-family: ${nps.nps_appearance.font};
          }
          .ul-contact-information-input-box input{
            height: 36px;
            border-radius: 4px;
            width: 100%;
            border: 1px solid #e9e9ef;
            font-size: 15px;
            padding: 2px 12px;
            box-sizing: border-box;
          }
          .ul-contact-information-input-box input::placeholder {
              color: #9eafbe
          }
  
          .ul-contact-information-input-box input:focus-visible {
              outline: none;
              border: 1px solid ${nps.nps_appearance.button_color};
          }
  
          .ul-contact-information-input-box input.error {
              border: 1px solid red;
  
          }
  
          .ul-nps-form-box{
            display: flex;
            justify-content: space-between;
            margin:10px 23px;
            flex-direction: column;
            gap: 15px;
          }
          .ul-nps-form-box .ul-check-box-continue {
            margin :0;
          }
  
          .ul-nps-information-question-form .ul-nps-question-box,.ul-nps-information-question-form .ul-nps-description-box{
              text-align:left;
              width:90%;
              margin:5px 23px;
          }
   
          .ul-open-question-textarea{
              width:80%;
              font-size: 15px;
              margin: 8px 0 15px 0;
              border: 1px solid #646f7;
              resize: none;
              border-radius: 4px;
              font-family: ${nps.nps_appearance.font};
              padding: 7px 0 0 5px;
              
          }
  
          .ul-open-question-textarea:focus-visible {
            outline: none;
          }
  
          .ul-star-rating-box{
            display: flex;
              justify-content: space-between;
              margin-top: 18px;
              gap: 8px;
              width:80%;
              padding: 2px;
          }
          .ul-star-rating{
              width: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 30px;
              border:none;
              cursor :pointer;
              border-radius : ${nps.nps_appearance.button_radius}px;
              transition: all 0.2s ease-in-out;
          }
          .ul-star-rating:hover{
            transform: scale(1.15);
            border-radius : ${nps.nps_appearance.button_radius}px !important;
            transition: all 0.2s ease-in-out;
          }
          .ul-nps-score-text-box{
            display :flex;
            justify-content: space-between;
            margin-top :6px;
            margin-bottom :10px;
            width:80%;
            flex-direction: ${
              nps.nps_appearance.reverse ? "row-reverse" : "row"
            };
          }
          .ul-nps-score-text-box span{
            font-size :13px;
            color :#646f79;
            font-family :${nps.nps_appearance.font}
          }
          .ul-emoji-box{
            display: flex;
            gap: 8px;
            width: 80%;
            height: 32px;
            justify-content: space-between;
            align-items: center;
            padding: 5px;
          }
          .ul-emoji-box .ul-nps-emoji{
            cursor: pointer;
            opacity: 0.7;
          }
          .ul-emoji-box .ul-nps-emoji:hover {
            transform: scale(1.2);
            opacity: 1  ;
            transition: all 0.2s ease-in-out;
          }
          
          </style>`;

      // dismiss button html
      const dismissButton = `<div class="ul-nps-custom-dismiss" id = "ul-nps-custom-dismiss">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="10px"
              viewBox="0 0 329.26933 329"
              width="10px"
            >
              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
            </svg>
          </div>`;

      // branding logo html
      const brandingLogo = `<div class="ul-nps-branding-logo">
            <i style = "color:#646f79";>Powered by</i>
            <span style = "color :#866afb";"font-size : 13px">
            UserLove
            </span>
          </div>`;

      let questionTypeHtml = iframeHandlerFunctions.nps.createNpsQuestionByType(
        nps_question,
        nps
      );
      const questionHtml = `<div class = "ul-nps-container" id = "nps-container" style= "background-color: ${
        nps.nps_appearance.background_color
      }">
              ${nps.nps_appearance.close_button ? dismissButton : ""}
              ${questionTypeHtml}
              ${!nps.nps_appearance.remove_branding ? brandingLogo : ""}
              
          </div>`;
      const npsIframe = document.getElementById(`ul-nps-${nps.nps_id}`);

      const npsDocument =
        npsIframe.contentDocument || npsIframe.contentWindow.document;

      npsDocument.body.innerHTML = questionHtml;
      npsDocument.head.innerHTML = styles;
      const npsContainer = npsDocument.getElementById(`nps-container`);

      npsIframe.style.height = `${npsContainer.scrollHeight}px`;

      iframeHandlerFunctions.nps.createNpsListeners(nps, nps_question);

      // remove iframe with settimeout
      const thankYouPage = npsDocument.getElementById("end-of-survey");
      if (thankYouPage) {
        userlove.track({
          event: ulConstants.events.nps.npsCompleted,
          data: {
            nps_id: nps.nps_id,
          },
        });
        if (nps_question.question_json.auto_fade_out) {
          setTimeout(() => {
            iframeHandlerFunctions.nps.removeNpsIframe(nps.nps_id);
          }, nps_question.question_json.fade_out_delay * 1000);
        }
      }
    },

    createNpsQuestionByType: (nps_question, nps) => {
      switch (nps_question.nps_element_type_key) {
        case ulConstants.nps.questionType.npsScoreQuestion: {
          return iframeHandlerFunctions.nps.createNpsScoreQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.multipleChoice: {
          return iframeHandlerFunctions.nps.createNpsMultipleChoiceQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.callToAction: {
          return iframeHandlerFunctions.nps.createNpsCallToActionQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.introductionPanel: {
          return iframeHandlerFunctions.nps.createNpsIntroductionPanelQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.openQuestion: {
          return iframeHandlerFunctions.nps.createNpsOpenQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.yesNoQuestion: {
          return iframeHandlerFunctions.nps.createNpsYesNoQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.contactInformation: {
          return iframeHandlerFunctions.nps.createNpsContactInformationQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.starRating: {
          return iframeHandlerFunctions.nps.createNpsStarRatingQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.customerSatisfaction: {
          return iframeHandlerFunctions.nps.createNpsCustomerSatisfactionQuestion(
            nps_question,
            nps
          );
        }
        case ulConstants.nps.questionType.endofSurvey: {
          return iframeHandlerFunctions.nps.endofSurvey(nps_question, nps);
        }
      }
    },

    createNpsScoreQuestion: (nps_question, nps) => {
      const arr5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let scoreButtons = [];
      //if nps questions are in gradient mode
      if (nps.nps_appearance.gradiant) {
        let scale = Number(nps_question.question_json.rating_count.value);
        if (scale === 5) {
          Array(2)
            .fill(" ")
            .forEach((_button, index) => {
              scoreButtons.push(`<button data-value="${
                index + 1
              }" style="background:#fd5551" class="ul-nps-score-button-${
                nps.nps_id
              }"
                value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
                nps_question.nps_question_id
              }","answer" : ${index + 1},"identifier" :"${
                nps_question.question_json.identifier
              }"}'>${index + 1}</button>`);
            });
          Array(2)
            .fill(" ")
            .forEach((_button, index) => {
              scoreButtons.push(`<button data-value="${
                index + 3
              }" style="background:#ffc400" class="ul-nps-score-button-${
                nps.nps_id
              }"
                value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
                nps_question.nps_question_id
              }","answer" : ${index + 3},"identifier" :"${
                nps_question.question_json.identifier
              }"}'>${index + 3}</button>`);
            });
          scoreButtons.push(`<button data-value="${5}" style="background:#09b570" class="ul-nps-score-button-${
            nps.nps_id
          }"
              value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
            nps_question.nps_question_id
          }","answer" : 5,"identifier" :"${
            nps_question.question_json.identifier
          }"}'>5</button>`);
        } else if (scale === 3) {
          Array(1)
            .fill(" ")
            .forEach((_button, index) => {
              scoreButtons.push(`<button data-value="${1}" style="background:#fd5551" class="ul-nps-score-button-${
                nps.nps_id
              }"
              value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
                nps_question.nps_question_id
              }","answer" : ${index + 1},"identifier" :"${
                nps_question.question_json.identifier
              }"}'>${index + 1}</button>`);
            });
          Array(1)
            .fill(" ")
            .forEach((_button, index) => {
              scoreButtons.push(`<button data-value="${2}" style="background:#ffc400" class="ul-nps-score-button-${
                nps.nps_id
              }"
              value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
                nps_question.nps_question_id
              }","answer" : ${index + 2},"identifier" :"${
                nps_question.question_json.identifier
              }"}'>${index + 2}</button>`);
            });
          scoreButtons.push(`<button data-value="${3}" style="background:#09b570" class="ul-nps-score-button-${
            nps.nps_id
          }"
              value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
            nps_question.nps_question_id
          }","answer" : 3,"identifier" :"${
            nps_question.question_json.identifier
          }"}'>3</button>`);
        } else {
          Array(6)
            .fill(" ")
            .forEach((_button, index) => {
              scoreButtons.push(`<button data-value="${
                index + 1
              }" style="background:#fd5551" class="ul-nps-score-button-${
                nps.nps_id
              }"
                value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
                nps_question.nps_question_id
              }","answer" : ${index + 1},"identifier" :"${
                nps_question.question_json.identifier
              }"}'>${index + 1}</button>`);
            });
          Array(2)
            .fill(" ")
            .forEach((_button, index) => {
              scoreButtons.push(`<button data-value="${
                index + 7
              }" style="background:#ffc400" class="ul-nps-score-button-${
                nps.nps_id
              }"
                value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
                nps_question.nps_question_id
              }","answer" : ${index + 7},"identifier" :"${
                nps_question.question_json.identifier
              }"}'>${index + 7}</button>`);
            });
          Array(2)
            .fill(" ")
            .forEach((_button, index) => {
              scoreButtons.push(`<button data-value="${
                index + 9
              }" style="background:#09b570" class="ul-nps-score-button-${
                nps.nps_id
              }"
                value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${
                nps_question.nps_question_id
              }","answer" : ${index + 9},"identifier" :"${
                nps_question.question_json.identifier
              }"}'>${index + 9}</button>`);
            });
        }
      } else {
        scoreButtons = arr5.map((item) => {
          if (item <= Number(nps_question.question_json.rating_count.value)) {
            return `<button data-value="${item}" class="ul-nps-score-button-${nps.nps_id}"
                value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${nps_question.nps_question_id}","answer" : ${item},"identifier" :"${nps_question.question_json.identifier}"}'>${item}</button>`;
          }
        });
      }

      if (nps.nps_appearance.reverse) {
        scoreButtons = scoreButtons.reverse();
      }
      scoreButtons = scoreButtons.join("");

      let npsQuestion = `<div class ="ul-nps-question-box">
          ${userloveMethods.common.attributeToValue(
            nps_question.question_json.question_name
          )}
        </div>
        <div class ="ul-nps-description-box">
          ${userloveMethods.common.attributeToValue(
            nps_question.question_json.description
              ? nps_question.question_json.description
              : nps_question.question_json.text || " "
          )}
        </div>
        <div class="ul-score-button-box">${scoreButtons}</div>
        <div class="ul-nps-score-text-box">
          <span>${
            nps_question.question_json.text_below_first_option || ""
          }</span>
          <span>${
            nps_question.question_json.text_below_last_option || ""
          }</span>
        </div>
        `;
      return npsQuestion;
    },
    createNpsMultipleChoiceQuestion: (nps_question, nps) => {
      //continue button html
      const continueHtml = `
           <div class="ul-check-box-continue">
            <button id='continue-button-${nps.nps_id}' disabled=true>Continue</button>
           </div>`;

      let multipleChoiceButtons = nps_question.question_json.options
        .map((option, index) => {
          return `<div class="ul-multiple-button-checkbox">
                <div class="ul-nps-custom-input" ${option.option_value}>
                  <input id="ul-nps-multi-choice-answer-${nps.nps_id}-${index}" type="checkbox" class = "ul-nps-multi-choice-answer-${nps.nps_id}" name="checkbox_group" value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${nps_question.nps_question_id}","answer" :"${option.option_value}","identifier" :"${nps_question.question_json.identifier}"}'>
                  <label for="ul-nps-multi-choice-answer-${nps.nps_id}-${index}">${option.option_value}</label>
                </div>
              </div>`;
        })
        .join("");
      let npsQuestion = `<div class ="ul-nps-question-box">
             ${userloveMethods.common.attributeToValue(
               nps_question.question_json.question_name
             )}
            </div>
            <div class ="ul-nps-description-box">
              ${userloveMethods.common.attributeToValue(
                nps_question.question_json.description
                  ? nps_question.question_json.description
                  : nps_question.question_json.text || " "
              )}
            </div>
            <div class="ul-multiple-choice-button-box">${multipleChoiceButtons}</div>${continueHtml}`;
      return npsQuestion;
    },

    createNpsCallToActionQuestion: (nps_question, nps) => {
      //continue button html
      const clickHereButton = `
          <a href="${
            nps_question.question_json.target_url
          }" id="call-to-action-button-${
        nps.nps_id
      }" class="ul-call-to-action-continue-button" style="background-color: ${
        nps.nps_appearance.button_color
      }; border-radius: ${
        nps.nps_appearance.button_radius
      }px;" target = "_blank" data-value='{"nps_id":"${
        nps.nps_id
      }","nps_question_id" :"${
        nps_question.nps_question_id
      }","answer":true,"identifier":"${
        nps_question.question_json.identifier
      }"}'> 
            <button  style="background-color: transparent; border:none;color:#fff;font-size:13px; cursor:pointer">${
              nps_question.question_json.submit_button_text
                ? nps_question.question_json.submit_button_text
                : "Continue"
            }</button>
          </a>`;

      let npsQuestion = `<div class ="ul-nps-question-box">
          ${userloveMethods.common.attributeToValue(
            nps_question.question_json.question_name
          )}
          </div>
          <div class ="ul-nps-description-box">
            ${userloveMethods.common.attributeToValue(
              nps_question.question_json.description
                ? nps_question.question_json.description
                : nps_question.question_json.text || " "
            )}
          </div>
         ${clickHereButton}
         `;
      return npsQuestion;
    },
    createNpsIntroductionPanelQuestion: (nps_question, nps) => {
      //continue button html
      const continueHtml = `
           <div class="ul-check-box-continue">
            <button id="ul-nps-introduction-panel-${
              nps.nps_id
            }" style="margin:0 auto;margin-top:10px;" value='{"nps_id":"${
        nps.nps_id
      }","nps_question_id" :"${
        nps_question.nps_question_id
      }","answer" :true,"identifier" :"${
        nps_question.question_json.identifier
      }"}'>${
        nps_question.question_json.continue_button
          ? nps_question.question_json.continue_button
          : "Continue"
      }</button>
           </div>`;

      let npsQuestion = `<div class ="ul-nps-question-box">
          ${userloveMethods.common.attributeToValue(
            nps_question.question_json.question_name
          )}
          </div>
          <div class ="ul-nps-description-box">
            ${userloveMethods.common.attributeToValue(
              nps_question.question_json.description
                ? nps_question.question_json.description
                : nps_question.question_json.text || " "
            )}
          </div>
         ${continueHtml}
         `;
      return npsQuestion;
    },
    createNpsOpenQuestion: (nps_question, nps) => {
      const continueHtml = `
        <div class="ul-check-box-continue">
        <button disabled=true id='continue-button-open-question-${
          nps.nps_id
        }' style="margin:0 auto;margin-top:10px;" value='{"nps_id":"${
        nps.nps_id
      }","nps_question_id" :"${
        nps_question.nps_question_id
      }","answer":true,"identifier" :"${
        nps_question.question_json.identifier
      }"}'>${
        nps_question.question_json.submit_button_text
          ? nps_question.question_json.submit_button_text
          : "Continue"
      }</button>
       </div>`;

      let npsQuestion = `<div class ="ul-nps-question-box">
         ${userloveMethods.common.attributeToValue(
           nps_question.question_json.question_name
         )}
          </div>
          <div class ="ul-nps-description-box">
            ${userloveMethods.common.attributeToValue(
              nps_question.question_json.description
                ? nps_question.question_json.description
                : nps_question.question_json.text || " "
            )}
          </div>
          <textarea maxlength= "250" rows=5 id = "ul-open-question-textarea" class="ul-open-question-textarea" placeholder="${
            nps_question.question_json.text
          }"></textarea>
        ${continueHtml}
      `;
      return npsQuestion;
    },
    createNpsYesNoQuestion: (nps_question, nps) => {
      // yes  buttons html
      const yesButton = `
        <button value = '{"nps_id":"${nps.nps_id}","nps_question_id" :"${
        nps_question.nps_question_id
      }","answer":"${
        nps_question.question_json.yes_button_text
      }","identifier" :"${nps_question.question_json.identifier}"}'
        class=${
          nps_question.question_json.highlight_yes
            ? "ul-yes-no-question-btn-highlight"
            : "ul-yes-no-question-btn"
        } id="yes-btn-${nps.nps_id}">${
        nps_question.question_json.yes_button_text
      }</button>
        `;
      const noButton = `
        <button value='{"nps_id":"${nps.nps_id}","nps_question_id" :"${nps_question.nps_question_id}","answer":"${nps_question.question_json.no_button_text}","identifier" :"${nps_question.question_json.identifier}"}'
        class= "ul-yes-no-question-btn" id="no-btn-${nps.nps_id}">${nps_question.question_json.no_button_text}</button>
        `;
      const buttonHtml = nps_question.question_json.button_order
        ? yesButton + noButton
        : noButton + yesButton;
      let npsQuestion = `<div class ="ul-nps-question-box">
           ${userloveMethods.common.attributeToValue(
             nps_question.question_json.question_name
           )}
          </div>
          <div class ="ul-nps-description-box">
            ${userloveMethods.common.attributeToValue(
              nps_question.question_json.description
                ? nps_question.question_json.description
                : nps_question.question_json.text || " "
            )}
          </div>
          <div class="ul-yes-no-button-box">
            ${buttonHtml}
          </div>`;

      return npsQuestion;
    },
    createNpsContactInformationQuestion: (nps_question, nps) => {
      const continueHtml = `
        <div class="ul-check-box-continue">
        <button type="submit" id='continue-button-contact-information-question-${
          nps.nps_id
        }' style="margin:10px 0 0 0; font-size: 14px;" value='{"nps_id":"${
        nps.nps_id
      }","nps_question_id" :"${nps_question.nps_question_id}","identifier" :"${
        nps_question.question_json.identifier
      }"}' disabled=true >${
        nps_question.question_json.next_button_text
          ? nps_question.question_json.next_button_text
          : "Continue"
      }</button>
       </div>`;

      //contact information html
      const inputDataHtml = nps_question.question_json.fieldData
        .map((data) => {
          return `<div class="ul-contact-information-input-box">
         <label>${data.label}${
            data.require ? `<span style="color: red;">*</span>` : ""
          }</label>
         <input id = "ul-nps-input-${data.fieldKey}" type="${
            data.fieldType
          }" placeholder="${data.placeholder}" ${
            data.require ? "required" : ""
          } />
         </div>`;
        })
        .join("");

      let npsQuestion = `
       <div class="ul-nps-information-question-form">
       <h3 class ="ul-nps-question-box">
      ${userloveMethods.common.attributeToValue(
        nps_question.question_json.question_name
      )}
       </h3>
       <div class ="ul-nps-description-box">
       ${userloveMethods.common.attributeToValue(
         nps_question.question_json.description
           ? nps_question.question_json.description
           : nps_question.question_json.text || " "
       )}
      </div>
      <div class="ul-nps-form-box">
      ${inputDataHtml}
      ${continueHtml}
      </div>
      </div>
      `;
      return npsQuestion;
    },
    createNpsStarRatingQuestion: (nps_question, nps) => {
      let scale = Number(nps_question.question_json.scale.value);
      let starHtml = Array(scale)
        .fill(" ")
        .map((_ele, index) => {
          return `<button class="ul-star-rating" style="color: ${
            nps.nps_appearance.button_color
          }"
            value = '{
              "nps_id":"${nps.nps_id}",
              "nps_question_id" :"${nps_question.nps_question_id}",
              "answer":${index + 1},
              "identifier" :"${nps_question.question_json.identifier}"
            }'>
          <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 5.77076C0 6.16858 0.0767556 6.4828 0.358606 6.75981C0.434564 6.83447 0.488506 6.88915 0.563966 6.96461C0.834797 7.23543 1.08426 7.4847 1.35498 7.75562L2.16065 8.53199C2.38806 8.7594 2.9004 9.18725 2.9004 9.40358C2.9004 9.74183 2.48181 12.0008 2.4149 12.4044C2.31626 12.9995 2.25242 13.3247 2.56008 13.7868C2.80159 14.1497 3.19136 14.4133 3.75 14.4133C4.24193 14.4133 5.09746 13.8564 5.625 13.593C5.78013 13.5156 5.91449 13.4327 6.06424 13.3584C6.2193 13.2815 6.36089 13.2094 6.5052 13.1256C6.64602 13.0437 6.7983 12.9789 6.95356 12.9001C7.47754 12.6342 7.46185 12.5716 8.04725 12.8993C8.1998 12.9847 8.35079 13.0419 8.4948 13.1256C8.6391 13.2094 8.7807 13.2815 8.93576 13.3584L9.59028 13.7C10.1364 13.9772 10.7396 14.4133 11.3086 14.4133C12.001 14.4133 12.5831 13.8599 12.6573 13.1826C12.7196 12.6144 12.0996 10.0391 12.0996 9.40358C12.0996 9.21252 12.3196 9.05175 12.4292 8.94215C12.6584 8.71291 13.2043 8.14633 13.4223 7.97239C13.6066 7.82535 14.2477 7.13108 14.511 6.89305C14.8126 6.62036 14.9689 6.28166 15 5.94416V5.69029C14.9638 5.30036 14.762 4.93539 14.4265 4.70365C14.0295 4.42946 13.6776 4.43555 13.1084 4.35182L10.9622 4.03706C10.1617 3.92379 10.3439 3.98782 9.73633 2.77271C9.54501 2.39007 9.37214 2.04141 9.17963 1.65949C8.98957 1.28243 8.8581 0.909354 8.62571 0.572786C8.10201 -0.185644 6.91992 -0.19034 6.38621 0.55541C6.16551 0.863783 6.00315 1.2938 5.82032 1.65943C5.63304 2.03394 5.45655 2.38695 5.27344 2.75318C4.56697 4.16612 4.92414 3.91118 3.34862 4.13892L1.17524 4.45576C0.538096 4.56583 0 5.10001 0 5.77076Z"
            fill="${nps.nps_appearance.button_color}"
          />
        </svg>
          </button>`;
        })
        .join(" ");

      let npsQuestion = `<div class ="ul-nps-question-box">
       ${userloveMethods.common.attributeToValue(
         nps_question.question_json.question_name
       )}
       </div>
       <div class ="ul-nps-description-box">
         ${userloveMethods.common.attributeToValue(
           nps_question.question_json.description
             ? nps_question.question_json.description
             : nps_question.question_json.text || " "
         )}
       </div>
       <div class="ul-star-rating-box">
        ${starHtml}
      </div>
      <div class="ul-nps-score-text-box">
          <span>${nps_question.question_json.low_score_text || ""}</span>
          <span>${nps_question.question_json.high_score_text || ""}</span>
      </div>
       
      `;
      return npsQuestion;
    },
    createNpsCustomerSatisfactionQuestion: (nps_question, nps) => {
      let emojis;
      let scale = Number(nps_question.question_json?.scale?.value);
      if (scale === 3) {
        emojis = [
          {
            icon: ` <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12.5"
                  cy="12.5"
                  r="11.5"
                  stroke=${
                    nps.nps_appearance.gradiant
                      ? "#FD5551"
                      : nps.nps_appearance.button_color
                  }
                  stroke-width="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#FD5551"
                      : nps.nps_appearance.button_color
                  }
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#FD5551"
                      : nps.nps_appearance.button_color
                  }
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#FD5551"
                      : nps.nps_appearance.button_color
                  }
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#FD5551"
                      : nps.nps_appearance.button_color
                  }
                />
              </svg>`,
            number: 1,
          },
          {
            icon: `<svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12.5"
                    cy="12.5"
                    r="11.5"
                    stroke=${
                      nps.nps_appearance.gradiant
                        ? "#E59D23"
                        : nps.nps_appearance.button_color
                    }
                    stroke-width="2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.04167 15.8532C8.04167 15.6164 8.2322 15.3649 8.46484 15.3649H16.5378C16.6521 15.3649 16.7631 15.4396 16.8249 15.5009C17.0904 15.7642 16.9425 16.3089 16.4401 16.3089H8.56251C8.27379 16.3089 8.04167 16.077 8.04167 15.8532ZM12.2952 4.16699H12.8128C13.9484 4.20009 15.0662 4.4523 16.028 4.93714C17.4588 5.65837 18.3768 6.39545 19.3235 7.69635C19.6231 8.10805 19.8267 8.50191 20.0645 8.9736C20.4463 9.73107 20.8346 11.0841 20.8346 12.2074V12.7933C20.8346 13.9296 20.4354 15.2921 20.0535 16.0486C19.3446 17.4527 18.5876 18.3949 17.3053 19.3226C16.8907 19.6226 16.502 19.8246 16.028 20.0635C15.2706 20.4453 13.9175 20.8337 12.7943 20.8337H12.2083C11.0678 20.8337 9.71245 20.436 8.953 20.0525C8.0961 19.6199 6.92379 18.874 6.33522 18.113C5.79968 17.4206 5.85007 17.626 5.27287 16.6689C5.14772 16.4613 5.04351 16.2381 4.92713 16.0055C4.33918 14.8304 4.16797 13.6366 4.16797 12.1748C4.16797 10.6241 4.86798 8.78045 5.70686 7.659C6.50502 6.59195 7.14385 5.98887 8.33277 5.27189C9.47213 4.58479 10.8812 4.20815 12.2952 4.16699ZM7.87891 10.7751C7.87891 9.98747 8.21745 9.49603 8.85488 9.17942C9.95659 8.63218 11.1992 9.6022 11.1992 10.5472C11.1992 11.0871 11.1186 11.5253 10.7035 11.907C9.57675 12.9432 7.87891 12.0999 7.87891 10.7751ZM15.3984 12.3701C15.1257 12.3701 14.9122 12.3087 14.7047 12.2175C14.5026 12.1286 14.3634 12.0018 14.2183 11.8576C13.12 10.7664 14.0393 8.98503 15.428 9.02358C15.9807 9.03891 16.476 9.30396 16.784 9.74754C17.1238 10.2369 17.1739 10.8234 16.9381 11.3707C16.6902 11.9463 16.105 12.3701 15.3984 12.3701Z"
                    fill=${
                      nps.nps_appearance.gradiant
                        ? "#E59D23"
                        : nps.nps_appearance.button_color
                    }
                    stroke="#fff"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.82227 10.7099C8.82227 11.6188 10.2546 11.6675 10.2546 10.6774C10.2546 10.3431 9.94615 9.99377 9.60352 9.99377C9.12511 9.99377 8.82227 10.2884 8.82227 10.7099Z"
                    fill=${
                      nps.nps_appearance.gradiant
                        ? "#E59D23"
                        : nps.nps_appearance.button_color
                    }
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.114 10.8076V10.6448C16.114 10.2755 15.809 9.99377 15.3653 9.99377C14.6021 9.99377 14.4411 11.1712 15.21 11.3864C15.4976 11.4669 15.7641 11.3787 15.9471 11.1616C16.0074 11.09 16.114 10.9283 16.114 10.8076Z"
                    fill=${
                      nps.nps_appearance.gradiant
                        ? "#E59D23"
                        : nps.nps_appearance.button_color
                    }
                  />
                </svg>`,
            number: 2,
          },
          {
            icon: ` <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12.5"
                  cy="12.5"
                  r="11.5"
                  stroke=${
                    nps.nps_appearance.gradiant
                      ? "#09B570"
                      : nps.nps_appearance.button_color
                  }
                  stroke-width="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.80469 12.7932C6.80469 12.5448 6.75867 12.077 7.32552 12.077H17.6771C18.2573 12.077 18.1979 12.5687 18.1979 12.8257C18.1979 13.7186 17.8325 14.7794 17.4309 15.4441C17.3353 15.6023 17.2621 15.7119 17.1631 15.8599L16.5424 16.6064C15.9637 17.1309 15.6774 17.3548 14.9538 17.7196C13.34 18.5333 11.1604 18.4241 9.62247 17.4949C8.73703 16.9599 8.10683 16.3299 7.5717 15.4441C7.47731 15.2879 7.41981 15.1615 7.33631 14.9959C7.0722 14.4723 6.80469 13.566 6.80469 12.7932ZM14.6497 10.3518C14.3217 10.3518 14.1289 10.2255 14.1289 9.86349C14.1289 9.31843 15.375 8.75671 16.082 8.75671C16.6491 8.75671 16.98 8.84345 17.428 9.07085C18.5373 9.63381 18.3043 10.3518 17.6771 10.3518C17.3511 10.3518 16.6695 9.23253 15.3327 9.92797C15.0257 10.0877 14.8705 10.3518 14.6497 10.3518ZM7.32552 10.3518C6.68117 10.3518 6.49215 9.63105 7.55289 9.08174C8.39716 8.64453 9.28223 8.64504 10.1255 9.08174C10.2449 9.14355 10.4763 9.29206 10.5731 9.38279C10.8027 9.59773 10.8737 9.60907 10.8737 9.96114C10.8737 10.211 10.6459 10.3518 10.3529 10.3518C10.0269 10.3518 9.34528 9.23253 8.00849 9.92797C7.70152 10.0877 7.5463 10.3518 7.32552 10.3518ZM4.16797 12.2398C4.16797 13.4791 4.24439 14.1665 4.64365 15.3123C4.83765 15.869 5.01464 16.1875 5.28578 16.6884C5.34866 16.8045 5.40659 16.882 5.47158 16.9909C5.73879 17.4383 6.24473 18.0438 6.60123 18.4003C6.93902 18.738 7.29367 19.0289 7.68336 19.3038C8.17249 19.6488 8.40826 19.7846 8.95264 20.0528C9.72365 20.4325 11.0616 20.8335 12.2083 20.8335H12.2525C13.1714 20.8333 13.6113 20.8251 14.5395 20.5931C14.8197 20.523 15.0517 20.449 15.3134 20.3579C16.3812 19.9857 17.0364 19.5249 17.8725 18.8805C19.5422 17.5935 20.8346 14.984 20.8346 12.7932C20.8346 11.2902 20.6573 10.2076 20.0647 8.9733C19.1632 7.09582 17.8897 5.8771 16.0496 4.94799C15.1696 4.50364 13.7926 4.16687 12.7943 4.16687C11.5397 4.16687 10.855 4.23633 9.68922 4.64255C9.45686 4.72353 9.18507 4.8309 8.97459 4.93703L8.01064 5.47048C6.64345 6.28692 5.64731 7.56698 4.93813 8.97349C4.4919 9.85848 4.16797 11.2381 4.16797 12.2398Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#09B570"
                      : nps.nps_appearance.button_color
                  }
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5013 17.3179C13.5596 17.3179 14.6415 16.9431 15.4088 16.3191C15.4792 16.2618 15.5014 16.2478 15.5696 16.187C15.6391 16.1251 15.6653 16.1149 15.7318 16.0563C16.0676 15.7604 16.4996 15.1847 16.7008 14.7791C16.8345 14.5094 16.9253 14.3158 17.0304 14.002C17.1041 13.7821 17.2214 13.3446 17.2214 13.0536H7.78125C7.78125 14.0105 8.53571 15.4085 9.27076 16.0563C10.1615 16.8413 11.2354 17.3179 12.5013 17.3179Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#09B570"
                      : nps.nps_appearance.button_color
                  }
                />
              </svg>`,
            number: 3,
          },
        ];
      } else {
        emojis =
          scale === 10
            ? [
                {
                  icon: ` <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="11.5"
                        stroke=${
                          nps.nps_appearance.gradiant
                            ? "#ff5552"
                            : nps.nps_appearance.button_color
                        }
                        stroke-width="2"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#ff5552"
                            : nps.nps_appearance.button_color
                        }
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#ff5552"
                            : nps.nps_appearance.button_color
                        }
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#ff5552"
                            : nps.nps_appearance.button_color
                        }
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#ff5552"
                            : nps.nps_appearance.button_color
                        }
                      />
                    </svg>`,
                  number: 1,
                },
                {
                  icon: ` <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.5"
                          cy="12.5"
                          r="11.5"
                          stroke=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                          stroke-width="2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                      </svg>`,
                  number: 2,
                },
                {
                  icon: ` <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.5"
                          cy="12.5"
                          r="11.5"
                          stroke=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                          stroke-width="2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                      </svg>`,
                  number: 3,
                },
                {
                  icon: ` <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.5"
                          cy="12.5"
                          r="11.5"
                          stroke=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                          stroke-width="2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                      </svg>`,
                  number: 4,
                },
                {
                  icon: ` <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.5"
                          cy="12.5"
                          r="11.5"
                          stroke=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                          stroke-width="2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                      </svg>`,
                  number: 5,
                },
                {
                  icon: ` <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.5"
                          cy="12.5"
                          r="11.5"
                          stroke=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                          stroke-width="2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#ff5552"
                              : nps.nps_appearance.button_color
                          }
                        />
                      </svg>`,
                  number: 6,
                },
                {
                  icon: `<svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12.5"
                  cy="12.5"
                  r="11.5"
                  stroke=${
                    nps.nps_appearance.gradiant
                      ? "#E59D23"
                      : nps.nps_appearance.button_color
                  }
                  stroke-width="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.04167 15.8532C8.04167 15.6164 8.2322 15.3649 8.46484 15.3649H16.5378C16.6521 15.3649 16.7631 15.4396 16.8249 15.5009C17.0904 15.7642 16.9425 16.3089 16.4401 16.3089H8.56251C8.27379 16.3089 8.04167 16.077 8.04167 15.8532ZM12.2952 4.16699H12.8128C13.9484 4.20009 15.0662 4.4523 16.028 4.93714C17.4588 5.65837 18.3768 6.39545 19.3235 7.69635C19.6231 8.10805 19.8267 8.50191 20.0645 8.9736C20.4463 9.73107 20.8346 11.0841 20.8346 12.2074V12.7933C20.8346 13.9296 20.4354 15.2921 20.0535 16.0486C19.3446 17.4527 18.5876 18.3949 17.3053 19.3226C16.8907 19.6226 16.502 19.8246 16.028 20.0635C15.2706 20.4453 13.9175 20.8337 12.7943 20.8337H12.2083C11.0678 20.8337 9.71245 20.436 8.953 20.0525C8.0961 19.6199 6.92379 18.874 6.33522 18.113C5.79968 17.4206 5.85007 17.626 5.27287 16.6689C5.14772 16.4613 5.04351 16.2381 4.92713 16.0055C4.33918 14.8304 4.16797 13.6366 4.16797 12.1748C4.16797 10.6241 4.86798 8.78045 5.70686 7.659C6.50502 6.59195 7.14385 5.98887 8.33277 5.27189C9.47213 4.58479 10.8812 4.20815 12.2952 4.16699ZM7.87891 10.7751C7.87891 9.98747 8.21745 9.49603 8.85488 9.17942C9.95659 8.63218 11.1992 9.6022 11.1992 10.5472C11.1992 11.0871 11.1186 11.5253 10.7035 11.907C9.57675 12.9432 7.87891 12.0999 7.87891 10.7751ZM15.3984 12.3701C15.1257 12.3701 14.9122 12.3087 14.7047 12.2175C14.5026 12.1286 14.3634 12.0018 14.2183 11.8576C13.12 10.7664 14.0393 8.98503 15.428 9.02358C15.9807 9.03891 16.476 9.30396 16.784 9.74754C17.1238 10.2369 17.1739 10.8234 16.9381 11.3707C16.6902 11.9463 16.105 12.3701 15.3984 12.3701Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#E59D23"
                      : nps.nps_appearance.button_color
                  }
                  stroke="#fff"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.82227 10.7099C8.82227 11.6188 10.2546 11.6675 10.2546 10.6774C10.2546 10.3431 9.94615 9.99377 9.60352 9.99377C9.12511 9.99377 8.82227 10.2884 8.82227 10.7099Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#E59D23"
                      : nps.nps_appearance.button_color
                  }
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.114 10.8076V10.6448C16.114 10.2755 15.809 9.99377 15.3653 9.99377C14.6021 9.99377 14.4411 11.1712 15.21 11.3864C15.4976 11.4669 15.7641 11.3787 15.9471 11.1616C16.0074 11.09 16.114 10.9283 16.114 10.8076Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#E59D23"
                      : nps.nps_appearance.button_color
                  }
                />
              </svg>`,
                  number: 7,
                },

                {
                  icon: `<svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="11.5"
                        stroke=${
                          nps.nps_appearance.gradiant
                            ? "#E59D23"
                            : nps.nps_appearance.button_color
                        }
                        stroke-width="2"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.04167 15.8532C8.04167 15.6164 8.2322 15.3649 8.46484 15.3649H16.5378C16.6521 15.3649 16.7631 15.4396 16.8249 15.5009C17.0904 15.7642 16.9425 16.3089 16.4401 16.3089H8.56251C8.27379 16.3089 8.04167 16.077 8.04167 15.8532ZM12.2952 4.16699H12.8128C13.9484 4.20009 15.0662 4.4523 16.028 4.93714C17.4588 5.65837 18.3768 6.39545 19.3235 7.69635C19.6231 8.10805 19.8267 8.50191 20.0645 8.9736C20.4463 9.73107 20.8346 11.0841 20.8346 12.2074V12.7933C20.8346 13.9296 20.4354 15.2921 20.0535 16.0486C19.3446 17.4527 18.5876 18.3949 17.3053 19.3226C16.8907 19.6226 16.502 19.8246 16.028 20.0635C15.2706 20.4453 13.9175 20.8337 12.7943 20.8337H12.2083C11.0678 20.8337 9.71245 20.436 8.953 20.0525C8.0961 19.6199 6.92379 18.874 6.33522 18.113C5.79968 17.4206 5.85007 17.626 5.27287 16.6689C5.14772 16.4613 5.04351 16.2381 4.92713 16.0055C4.33918 14.8304 4.16797 13.6366 4.16797 12.1748C4.16797 10.6241 4.86798 8.78045 5.70686 7.659C6.50502 6.59195 7.14385 5.98887 8.33277 5.27189C9.47213 4.58479 10.8812 4.20815 12.2952 4.16699ZM7.87891 10.7751C7.87891 9.98747 8.21745 9.49603 8.85488 9.17942C9.95659 8.63218 11.1992 9.6022 11.1992 10.5472C11.1992 11.0871 11.1186 11.5253 10.7035 11.907C9.57675 12.9432 7.87891 12.0999 7.87891 10.7751ZM15.3984 12.3701C15.1257 12.3701 14.9122 12.3087 14.7047 12.2175C14.5026 12.1286 14.3634 12.0018 14.2183 11.8576C13.12 10.7664 14.0393 8.98503 15.428 9.02358C15.9807 9.03891 16.476 9.30396 16.784 9.74754C17.1238 10.2369 17.1739 10.8234 16.9381 11.3707C16.6902 11.9463 16.105 12.3701 15.3984 12.3701Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#E59D23"
                            : nps.nps_appearance.button_color
                        }
                        stroke="#fff"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.82227 10.7099C8.82227 11.6188 10.2546 11.6675 10.2546 10.6774C10.2546 10.3431 9.94615 9.99377 9.60352 9.99377C9.12511 9.99377 8.82227 10.2884 8.82227 10.7099Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#E59D23"
                            : nps.nps_appearance.button_color
                        }
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.114 10.8076V10.6448C16.114 10.2755 15.809 9.99377 15.3653 9.99377C14.6021 9.99377 14.4411 11.1712 15.21 11.3864C15.4976 11.4669 15.7641 11.3787 15.9471 11.1616C16.0074 11.09 16.114 10.9283 16.114 10.8076Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#E59D23"
                            : nps.nps_appearance.button_color
                        }
                      />
                    </svg>`,
                  number: 8,
                },
                {
                  icon: `<svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="11.5"
                        stroke=${
                          nps.nps_appearance.gradiant
                            ? "#09B570"
                            : nps.nps_appearance.button_color
                        }
                        stroke-width="2"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.80469 12.7932C6.80469 12.5448 6.75867 12.077 7.32552 12.077H17.6771C18.2573 12.077 18.1979 12.5687 18.1979 12.8257C18.1979 13.7186 17.8325 14.7794 17.4309 15.4441C17.3353 15.6023 17.2621 15.7119 17.1631 15.8599L16.5424 16.6064C15.9637 17.1309 15.6774 17.3548 14.9538 17.7196C13.34 18.5333 11.1604 18.4241 9.62247 17.4949C8.73703 16.9599 8.10683 16.3299 7.5717 15.4441C7.47731 15.2879 7.41981 15.1615 7.33631 14.9959C7.0722 14.4723 6.80469 13.566 6.80469 12.7932ZM14.6497 10.3518C14.3217 10.3518 14.1289 10.2255 14.1289 9.86349C14.1289 9.31843 15.375 8.75671 16.082 8.75671C16.6491 8.75671 16.98 8.84345 17.428 9.07085C18.5373 9.63381 18.3043 10.3518 17.6771 10.3518C17.3511 10.3518 16.6695 9.23253 15.3327 9.92797C15.0257 10.0877 14.8705 10.3518 14.6497 10.3518ZM7.32552 10.3518C6.68117 10.3518 6.49215 9.63105 7.55289 9.08174C8.39716 8.64453 9.28223 8.64504 10.1255 9.08174C10.2449 9.14355 10.4763 9.29206 10.5731 9.38279C10.8027 9.59773 10.8737 9.60907 10.8737 9.96114C10.8737 10.211 10.6459 10.3518 10.3529 10.3518C10.0269 10.3518 9.34528 9.23253 8.00849 9.92797C7.70152 10.0877 7.5463 10.3518 7.32552 10.3518ZM4.16797 12.2398C4.16797 13.4791 4.24439 14.1665 4.64365 15.3123C4.83765 15.869 5.01464 16.1875 5.28578 16.6884C5.34866 16.8045 5.40659 16.882 5.47158 16.9909C5.73879 17.4383 6.24473 18.0438 6.60123 18.4003C6.93902 18.738 7.29367 19.0289 7.68336 19.3038C8.17249 19.6488 8.40826 19.7846 8.95264 20.0528C9.72365 20.4325 11.0616 20.8335 12.2083 20.8335H12.2525C13.1714 20.8333 13.6113 20.8251 14.5395 20.5931C14.8197 20.523 15.0517 20.449 15.3134 20.3579C16.3812 19.9857 17.0364 19.5249 17.8725 18.8805C19.5422 17.5935 20.8346 14.984 20.8346 12.7932C20.8346 11.2902 20.6573 10.2076 20.0647 8.9733C19.1632 7.09582 17.8897 5.8771 16.0496 4.94799C15.1696 4.50364 13.7926 4.16687 12.7943 4.16687C11.5397 4.16687 10.855 4.23633 9.68922 4.64255C9.45686 4.72353 9.18507 4.8309 8.97459 4.93703L8.01064 5.47048C6.64345 6.28692 5.64731 7.56698 4.93813 8.97349C4.4919 9.85848 4.16797 11.2381 4.16797 12.2398Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#09B570"
                            : nps.nps_appearance.button_color
                        }
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5013 17.3179C13.5596 17.3179 14.6415 16.9431 15.4088 16.3191C15.4792 16.2618 15.5014 16.2478 15.5696 16.187C15.6391 16.1251 15.6653 16.1149 15.7318 16.0563C16.0676 15.7604 16.4996 15.1847 16.7008 14.7791C16.8345 14.5094 16.9253 14.3158 17.0304 14.002C17.1041 13.7821 17.2214 13.3446 17.2214 13.0536H7.78125C7.78125 14.0105 8.53571 15.4085 9.27076 16.0563C10.1615 16.8413 11.2354 17.3179 12.5013 17.3179Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#09B570"
                            : nps.nps_appearance.button_color
                        }
                      />
                    </svg>`,
                  number: 9,
                },
                {
                  icon: `<svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.5"
                          cy="12.5"
                          r="11.5"
                          stroke=${
                            nps.nps_appearance.gradiant
                              ? "#09B570"
                              : nps.nps_appearance.button_color
                          }
                          stroke-width="2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.80469 12.7932C6.80469 12.5448 6.75867 12.077 7.32552 12.077H17.6771C18.2573 12.077 18.1979 12.5687 18.1979 12.8257C18.1979 13.7186 17.8325 14.7794 17.4309 15.4441C17.3353 15.6023 17.2621 15.7119 17.1631 15.8599L16.5424 16.6064C15.9637 17.1309 15.6774 17.3548 14.9538 17.7196C13.34 18.5333 11.1604 18.4241 9.62247 17.4949C8.73703 16.9599 8.10683 16.3299 7.5717 15.4441C7.47731 15.2879 7.41981 15.1615 7.33631 14.9959C7.0722 14.4723 6.80469 13.566 6.80469 12.7932ZM14.6497 10.3518C14.3217 10.3518 14.1289 10.2255 14.1289 9.86349C14.1289 9.31843 15.375 8.75671 16.082 8.75671C16.6491 8.75671 16.98 8.84345 17.428 9.07085C18.5373 9.63381 18.3043 10.3518 17.6771 10.3518C17.3511 10.3518 16.6695 9.23253 15.3327 9.92797C15.0257 10.0877 14.8705 10.3518 14.6497 10.3518ZM7.32552 10.3518C6.68117 10.3518 6.49215 9.63105 7.55289 9.08174C8.39716 8.64453 9.28223 8.64504 10.1255 9.08174C10.2449 9.14355 10.4763 9.29206 10.5731 9.38279C10.8027 9.59773 10.8737 9.60907 10.8737 9.96114C10.8737 10.211 10.6459 10.3518 10.3529 10.3518C10.0269 10.3518 9.34528 9.23253 8.00849 9.92797C7.70152 10.0877 7.5463 10.3518 7.32552 10.3518ZM4.16797 12.2398C4.16797 13.4791 4.24439 14.1665 4.64365 15.3123C4.83765 15.869 5.01464 16.1875 5.28578 16.6884C5.34866 16.8045 5.40659 16.882 5.47158 16.9909C5.73879 17.4383 6.24473 18.0438 6.60123 18.4003C6.93902 18.738 7.29367 19.0289 7.68336 19.3038C8.17249 19.6488 8.40826 19.7846 8.95264 20.0528C9.72365 20.4325 11.0616 20.8335 12.2083 20.8335H12.2525C13.1714 20.8333 13.6113 20.8251 14.5395 20.5931C14.8197 20.523 15.0517 20.449 15.3134 20.3579C16.3812 19.9857 17.0364 19.5249 17.8725 18.8805C19.5422 17.5935 20.8346 14.984 20.8346 12.7932C20.8346 11.2902 20.6573 10.2076 20.0647 8.9733C19.1632 7.09582 17.8897 5.8771 16.0496 4.94799C15.1696 4.50364 13.7926 4.16687 12.7943 4.16687C11.5397 4.16687 10.855 4.23633 9.68922 4.64255C9.45686 4.72353 9.18507 4.8309 8.97459 4.93703L8.01064 5.47048C6.64345 6.28692 5.64731 7.56698 4.93813 8.97349C4.4919 9.85848 4.16797 11.2381 4.16797 12.2398Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#09B570"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.5013 17.3179C13.5596 17.3179 14.6415 16.9431 15.4088 16.3191C15.4792 16.2618 15.5014 16.2478 15.5696 16.187C15.6391 16.1251 15.6653 16.1149 15.7318 16.0563C16.0676 15.7604 16.4996 15.1847 16.7008 14.7791C16.8345 14.5094 16.9253 14.3158 17.0304 14.002C17.1041 13.7821 17.2214 13.3446 17.2214 13.0536H7.78125C7.78125 14.0105 8.53571 15.4085 9.27076 16.0563C10.1615 16.8413 11.2354 17.3179 12.5013 17.3179Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#09B570"
                              : nps.nps_appearance.button_color
                          }
                        />
                      </svg>`,
                  number: 10,
                },
              ]
            : [
                {
                  icon: ` <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12.5"
                      cy="12.5"
                      r="11.5"
                      stroke=${
                        nps.nps_appearance.gradiant
                          ? "#FD5551"
                          : nps.nps_appearance.button_color
                      }
                      stroke-width="2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                      fill=${
                        nps.nps_appearance.gradiant
                          ? "#FD5551"
                          : nps.nps_appearance.button_color
                      }
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                      fill=${
                        nps.nps_appearance.gradiant
                          ? "#FD5551"
                          : nps.nps_appearance.button_color
                      }
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                      fill=${
                        nps.nps_appearance.gradiant
                          ? "#FD5551"
                          : nps.nps_appearance.button_color
                      }
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                      fill=${
                        nps.nps_appearance.gradiant
                          ? "#FD5551"
                          : nps.nps_appearance.button_color
                      }
                    />
                  </svg>`,
                  number: 1,
                },
                {
                  icon: ` <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.5"
                          cy="12.5"
                          r="11.5"
                          stroke=${
                            nps.nps_appearance.gradiant
                              ? "#FD5551"
                              : nps.nps_appearance.button_color
                          }
                          stroke-width="2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.3711 13.835C12.9323 13.835 13.09 13.8503 13.5945 14.0764C14.2852 14.3858 14.7349 15.0678 14.9113 15.7869C14.9323 15.8725 14.9817 16.2339 14.9718 16.3355C14.9367 16.6961 14.8748 17.0333 14.737 17.3076C14.4719 17.8351 14.0776 18.2987 13.516 18.5281C12.8012 18.82 12.235 18.8267 11.5101 18.5371L10.9636 18.2047C10.7315 18.0133 10.8412 18.1359 10.6504 17.8994C10.5969 17.8331 10.5653 17.8111 10.5151 17.7417C10.147 17.2321 9.94271 16.4987 10.0783 15.8391C10.2036 15.2294 10.5205 14.6924 11.0082 14.3275C11.1169 14.2462 11.2555 14.1487 11.3855 14.0864C11.6546 13.9573 11.9876 13.835 12.3711 13.835V13.835ZM7.87891 11.3936V11.2308C7.87891 9.95847 9.51829 9.05035 10.6868 10.083C11.2761 10.6038 11.3837 11.6823 10.8791 12.3104L10.6736 12.5281C9.99701 13.149 9.0023 13.1235 8.39142 12.5086C8.12682 12.2423 7.87891 11.9084 7.87891 11.3936V11.3936ZM13.7383 11.3285C13.7383 9.81775 15.5361 9.07379 16.5953 10.1316C17.7055 11.2402 16.8025 13.2373 15.0814 12.9476C14.3805 12.8296 13.7383 12.1321 13.7383 11.3285ZM13.7708 7.25945C13.7708 6.16717 15.6289 7.07399 15.9781 7.29824C16.0968 7.37443 16.1955 7.44172 16.3056 7.52416C16.3819 7.58132 16.3952 7.59603 16.4654 7.65731C16.5342 7.71733 16.5591 7.72456 16.6277 7.78801C16.963 8.09821 17.0912 8.20541 17.0912 8.56153C17.0912 8.80724 16.8836 8.95215 16.6029 8.95215C16.3424 8.95215 16.2179 8.74654 15.9604 8.4878C15.5818 8.10717 15.0063 7.80788 14.4552 7.71444C14.2827 7.6852 14.1244 7.69721 13.9977 7.61851C13.8998 7.55774 13.7708 7.41465 13.7708 7.25945V7.25945ZM8.46484 8.95215C8.13951 8.95215 7.91146 8.88792 7.91146 8.46387C7.91146 8.37191 7.92139 8.32146 7.95901 8.25101C8.02998 8.1181 8.25168 7.90676 8.3584 7.80403C8.94441 7.23992 9.91538 6.73861 10.8086 6.73861C11.1861 6.73861 11.4292 7.32613 11.0244 7.6055C10.8848 7.7019 10.7518 7.68087 10.5755 7.70992C9.18854 7.93848 8.79813 8.95215 8.46484 8.95215ZM4.16797 12.1748C4.16797 13.6366 4.33918 14.8304 4.92713 16.0055C5.04351 16.2381 5.14772 16.4613 5.27287 16.6689C5.40213 16.8832 5.52438 17.0858 5.66545 17.2854C5.94058 17.6745 6.24688 18.0461 6.58496 18.3841C6.93354 18.7327 7.27958 19.0145 7.67851 19.3088C8.82065 20.1514 10.629 20.8337 12.2083 20.8337H12.7943C13.9175 20.8337 15.2706 20.4453 16.028 20.0635C16.502 19.8246 16.8907 19.6226 17.3053 19.3226C18.1603 18.7041 18.6866 18.1678 19.3098 17.3231C20.1521 16.1814 20.8346 14.3719 20.8346 12.7933V12.2074C20.8346 10.1277 19.8056 8.00448 18.4014 6.60026C18.05 6.24887 17.7143 5.97582 17.3053 5.67812C16.1363 4.82744 14.3728 4.16699 12.7617 4.16699C11.3292 4.16699 10.1247 4.36147 8.99614 4.92616C8.76354 5.04253 8.54028 5.14674 8.33277 5.27189C7.40348 5.83231 6.86795 6.27887 6.14581 7.08885C5.04414 8.32453 4.16797 10.4298 4.16797 12.1748V12.1748Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#FD5551"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.0039 16.1785C11.0039 16.6726 11.1106 17.0045 11.4181 17.3268C11.9944 17.9308 13.0082 17.9308 13.5845 17.3268C14.0766 16.811 14.1492 15.9371 13.7111 15.3919L13.5723 15.2377C13.5677 15.2329 13.561 15.226 13.5562 15.2213C12.9662 14.6308 12.0393 14.6279 11.4464 15.2213L11.3063 15.3741C11.1498 15.5595 11.0039 15.9201 11.0039 16.1785Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#FD5551"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.82227 11.296C8.82227 12.2466 10.2546 12.2544 10.2546 11.296C10.2546 10.3709 8.82227 10.3709 8.82227 11.296Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#FD5551"
                              : nps.nps_appearance.button_color
                          }
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3651 12.0119C16.2877 12.0119 16.3165 10.9122 15.6863 10.6489C15.1159 10.4106 14.5233 10.9591 14.7417 11.5609C14.8181 11.7715 15.0806 12.0119 15.3651 12.0119Z"
                          fill=${
                            nps.nps_appearance.gradiant
                              ? "#FD5551"
                              : nps.nps_appearance.button_color
                          }
                        />
                      </svg>`,
                  number: 2,
                },
                {
                  icon: `<svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="11.5"
                        stroke=${
                          nps.nps_appearance.gradiant
                            ? "#E59D23"
                            : nps.nps_appearance.button_color
                        }
                        stroke-width="2"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.04167 15.8532C8.04167 15.6164 8.2322 15.3649 8.46484 15.3649H16.5378C16.6521 15.3649 16.7631 15.4396 16.8249 15.5009C17.0904 15.7642 16.9425 16.3089 16.4401 16.3089H8.56251C8.27379 16.3089 8.04167 16.077 8.04167 15.8532ZM12.2952 4.16699H12.8128C13.9484 4.20009 15.0662 4.4523 16.028 4.93714C17.4588 5.65837 18.3768 6.39545 19.3235 7.69635C19.6231 8.10805 19.8267 8.50191 20.0645 8.9736C20.4463 9.73107 20.8346 11.0841 20.8346 12.2074V12.7933C20.8346 13.9296 20.4354 15.2921 20.0535 16.0486C19.3446 17.4527 18.5876 18.3949 17.3053 19.3226C16.8907 19.6226 16.502 19.8246 16.028 20.0635C15.2706 20.4453 13.9175 20.8337 12.7943 20.8337H12.2083C11.0678 20.8337 9.71245 20.436 8.953 20.0525C8.0961 19.6199 6.92379 18.874 6.33522 18.113C5.79968 17.4206 5.85007 17.626 5.27287 16.6689C5.14772 16.4613 5.04351 16.2381 4.92713 16.0055C4.33918 14.8304 4.16797 13.6366 4.16797 12.1748C4.16797 10.6241 4.86798 8.78045 5.70686 7.659C6.50502 6.59195 7.14385 5.98887 8.33277 5.27189C9.47213 4.58479 10.8812 4.20815 12.2952 4.16699ZM7.87891 10.7751C7.87891 9.98747 8.21745 9.49603 8.85488 9.17942C9.95659 8.63218 11.1992 9.6022 11.1992 10.5472C11.1992 11.0871 11.1186 11.5253 10.7035 11.907C9.57675 12.9432 7.87891 12.0999 7.87891 10.7751ZM15.3984 12.3701C15.1257 12.3701 14.9122 12.3087 14.7047 12.2175C14.5026 12.1286 14.3634 12.0018 14.2183 11.8576C13.12 10.7664 14.0393 8.98503 15.428 9.02358C15.9807 9.03891 16.476 9.30396 16.784 9.74754C17.1238 10.2369 17.1739 10.8234 16.9381 11.3707C16.6902 11.9463 16.105 12.3701 15.3984 12.3701Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#E59D23"
                            : nps.nps_appearance.button_color
                        }
                        stroke="#fff"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.82227 10.7099C8.82227 11.6188 10.2546 11.6675 10.2546 10.6774C10.2546 10.3431 9.94615 9.99377 9.60352 9.99377C9.12511 9.99377 8.82227 10.2884 8.82227 10.7099Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#E59D23"
                            : nps.nps_appearance.button_color
                        }
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.114 10.8076V10.6448C16.114 10.2755 15.809 9.99377 15.3653 9.99377C14.6021 9.99377 14.4411 11.1712 15.21 11.3864C15.4976 11.4669 15.7641 11.3787 15.9471 11.1616C16.0074 11.09 16.114 10.9283 16.114 10.8076Z"
                        fill=${
                          nps.nps_appearance.gradiant
                            ? "#E59D23"
                            : nps.nps_appearance.button_color
                        }
                      />
                    </svg>`,
                  number: 3,
                },
                {
                  icon: `<svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12.5"
                  cy="12.5"
                  r="11.5"
                  stroke=${
                    nps.nps_appearance.gradiant
                      ? "#E59D23"
                      : nps.nps_appearance.button_color
                  }
                  stroke-width="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.04167 15.8532C8.04167 15.6164 8.2322 15.3649 8.46484 15.3649H16.5378C16.6521 15.3649 16.7631 15.4396 16.8249 15.5009C17.0904 15.7642 16.9425 16.3089 16.4401 16.3089H8.56251C8.27379 16.3089 8.04167 16.077 8.04167 15.8532ZM12.2952 4.16699H12.8128C13.9484 4.20009 15.0662 4.4523 16.028 4.93714C17.4588 5.65837 18.3768 6.39545 19.3235 7.69635C19.6231 8.10805 19.8267 8.50191 20.0645 8.9736C20.4463 9.73107 20.8346 11.0841 20.8346 12.2074V12.7933C20.8346 13.9296 20.4354 15.2921 20.0535 16.0486C19.3446 17.4527 18.5876 18.3949 17.3053 19.3226C16.8907 19.6226 16.502 19.8246 16.028 20.0635C15.2706 20.4453 13.9175 20.8337 12.7943 20.8337H12.2083C11.0678 20.8337 9.71245 20.436 8.953 20.0525C8.0961 19.6199 6.92379 18.874 6.33522 18.113C5.79968 17.4206 5.85007 17.626 5.27287 16.6689C5.14772 16.4613 5.04351 16.2381 4.92713 16.0055C4.33918 14.8304 4.16797 13.6366 4.16797 12.1748C4.16797 10.6241 4.86798 8.78045 5.70686 7.659C6.50502 6.59195 7.14385 5.98887 8.33277 5.27189C9.47213 4.58479 10.8812 4.20815 12.2952 4.16699ZM7.87891 10.7751C7.87891 9.98747 8.21745 9.49603 8.85488 9.17942C9.95659 8.63218 11.1992 9.6022 11.1992 10.5472C11.1992 11.0871 11.1186 11.5253 10.7035 11.907C9.57675 12.9432 7.87891 12.0999 7.87891 10.7751ZM15.3984 12.3701C15.1257 12.3701 14.9122 12.3087 14.7047 12.2175C14.5026 12.1286 14.3634 12.0018 14.2183 11.8576C13.12 10.7664 14.0393 8.98503 15.428 9.02358C15.9807 9.03891 16.476 9.30396 16.784 9.74754C17.1238 10.2369 17.1739 10.8234 16.9381 11.3707C16.6902 11.9463 16.105 12.3701 15.3984 12.3701Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#E59D23"
                      : nps.nps_appearance.button_color
                  }
                  stroke="#fff"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.82227 10.7099C8.82227 11.6188 10.2546 11.6675 10.2546 10.6774C10.2546 10.3431 9.94615 9.99377 9.60352 9.99377C9.12511 9.99377 8.82227 10.2884 8.82227 10.7099Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#E59D23"
                      : nps.nps_appearance.button_color
                  }
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.114 10.8076V10.6448C16.114 10.2755 15.809 9.99377 15.3653 9.99377C14.6021 9.99377 14.4411 11.1712 15.21 11.3864C15.4976 11.4669 15.7641 11.3787 15.9471 11.1616C16.0074 11.09 16.114 10.9283 16.114 10.8076Z"
                  fill=${
                    nps.nps_appearance.gradiant
                      ? "#E59D23"
                      : nps.nps_appearance.button_color
                  }
                />
              </svg>`,
                  number: 4,
                },
                {
                  icon: ` <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12.5"
                      cy="12.5"
                      r="11.5"
                      stroke=${
                        nps.nps_appearance.gradiant
                          ? "#09B570"
                          : nps.nps_appearance.button_color
                      }
                      stroke-width="2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.80469 12.7932C6.80469 12.5448 6.75867 12.077 7.32552 12.077H17.6771C18.2573 12.077 18.1979 12.5687 18.1979 12.8257C18.1979 13.7186 17.8325 14.7794 17.4309 15.4441C17.3353 15.6023 17.2621 15.7119 17.1631 15.8599L16.5424 16.6064C15.9637 17.1309 15.6774 17.3548 14.9538 17.7196C13.34 18.5333 11.1604 18.4241 9.62247 17.4949C8.73703 16.9599 8.10683 16.3299 7.5717 15.4441C7.47731 15.2879 7.41981 15.1615 7.33631 14.9959C7.0722 14.4723 6.80469 13.566 6.80469 12.7932ZM14.6497 10.3518C14.3217 10.3518 14.1289 10.2255 14.1289 9.86349C14.1289 9.31843 15.375 8.75671 16.082 8.75671C16.6491 8.75671 16.98 8.84345 17.428 9.07085C18.5373 9.63381 18.3043 10.3518 17.6771 10.3518C17.3511 10.3518 16.6695 9.23253 15.3327 9.92797C15.0257 10.0877 14.8705 10.3518 14.6497 10.3518ZM7.32552 10.3518C6.68117 10.3518 6.49215 9.63105 7.55289 9.08174C8.39716 8.64453 9.28223 8.64504 10.1255 9.08174C10.2449 9.14355 10.4763 9.29206 10.5731 9.38279C10.8027 9.59773 10.8737 9.60907 10.8737 9.96114C10.8737 10.211 10.6459 10.3518 10.3529 10.3518C10.0269 10.3518 9.34528 9.23253 8.00849 9.92797C7.70152 10.0877 7.5463 10.3518 7.32552 10.3518ZM4.16797 12.2398C4.16797 13.4791 4.24439 14.1665 4.64365 15.3123C4.83765 15.869 5.01464 16.1875 5.28578 16.6884C5.34866 16.8045 5.40659 16.882 5.47158 16.9909C5.73879 17.4383 6.24473 18.0438 6.60123 18.4003C6.93902 18.738 7.29367 19.0289 7.68336 19.3038C8.17249 19.6488 8.40826 19.7846 8.95264 20.0528C9.72365 20.4325 11.0616 20.8335 12.2083 20.8335H12.2525C13.1714 20.8333 13.6113 20.8251 14.5395 20.5931C14.8197 20.523 15.0517 20.449 15.3134 20.3579C16.3812 19.9857 17.0364 19.5249 17.8725 18.8805C19.5422 17.5935 20.8346 14.984 20.8346 12.7932C20.8346 11.2902 20.6573 10.2076 20.0647 8.9733C19.1632 7.09582 17.8897 5.8771 16.0496 4.94799C15.1696 4.50364 13.7926 4.16687 12.7943 4.16687C11.5397 4.16687 10.855 4.23633 9.68922 4.64255C9.45686 4.72353 9.18507 4.8309 8.97459 4.93703L8.01064 5.47048C6.64345 6.28692 5.64731 7.56698 4.93813 8.97349C4.4919 9.85848 4.16797 11.2381 4.16797 12.2398Z"
                      fill=${
                        nps.nps_appearance.gradiant
                          ? "#09B570"
                          : nps.nps_appearance.button_color
                      }
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5013 17.3179C13.5596 17.3179 14.6415 16.9431 15.4088 16.3191C15.4792 16.2618 15.5014 16.2478 15.5696 16.187C15.6391 16.1251 15.6653 16.1149 15.7318 16.0563C16.0676 15.7604 16.4996 15.1847 16.7008 14.7791C16.8345 14.5094 16.9253 14.3158 17.0304 14.002C17.1041 13.7821 17.2214 13.3446 17.2214 13.0536H7.78125C7.78125 14.0105 8.53571 15.4085 9.27076 16.0563C10.1615 16.8413 11.2354 17.3179 12.5013 17.3179Z"
                      fill=${
                        nps.nps_appearance.gradiant
                          ? "#09B570"
                          : nps.nps_appearance.button_color
                      }
                    />
                  </svg>`,
                  number: 5,
                },
              ];
      }

      if (nps.nps_appearance.reverse) {
        emojis = emojis.reverse();
      }
      const emojiHtml = emojis
        .map((emoji) => {
          return `<div class="ul-nps-emoji" data-number='{
              "answer": ${emoji.number},
              "nps_id": "${nps.nps_id}",
              "nps_question_id": "${nps_question.nps_question_id}",
              "identifier": "${nps_question.question_json.identifier}"
            }'>${emoji.icon}</div>`;
        })
        .join(" ");

      let npsQuestion = `<div class ="ul-nps-question-box">
         ${userloveMethods.common.attributeToValue(
           nps_question.question_json.question_name
         )}
        </div>
        <div class ="ul-nps-description-box">
          ${userloveMethods.common.attributeToValue(
            nps_question.question_json.description
              ? nps_question.question_json.description
              : nps_question.question_json.text || " "
          )}
        </div>
        <div class="ul-emoji-box" >
          ${emojiHtml}
        </div>
        <div class="ul-nps-score-text-box">
          <span>${nps_question.question_json.nagative_score_text || ""}</span>
          <span>${nps_question.question_json.positive_score_text || ""}</span>
      </div>
        `;

      return npsQuestion;
    },
    endofSurvey: (nps_question, _nps) => {
      let endofSurvey = `<div class ="ul-nps-question-box" id="end-of-survey">
         ${userloveMethods.common.attributeToValue(
           nps_question.question_json.question_name
         )}
        </div>
        <div class ="ul-nps-description-box">
          ${userloveMethods.common.attributeToValue(
            nps_question.question_json.description
              ? nps_question.question_json.description
              : nps_question.question_json.text || " "
          )}
        </div> `;

      return endofSurvey;
    },
    removeNpsIframe: (nps_id) => {
      const npsToRemove = document.getElementById(`ul-nps-${nps_id}`);
      if (npsToRemove) {
        npsToRemove.style.opacity = "0";
        setTimeout(() => {
          if (npsToRemove) {
            document.body.removeChild(npsToRemove);
          }
        }, 1000);
      }
    },
  },
};

const userloveMethods = {
  anonymous: () => {
    const id = uuidv4();
    window.currentUserInfo = {
      user_tracking_id: id,
      user_type: "anonymous",
      user_details: null,
    };
    localStorage.setItem(
      "currentUserInfo",
      JSON.stringify(window.currentUserInfo)
    );
  },

  identify: async ({ id, userData }) => {
    //Return if already identified
    if (window.currentUserInfo.user_type !== "anonymous") {
      return;
    }
    const anonymous_tracking_id = window.currentUserInfo.user_tracking_id;
    try {
      let bodyData = userloveMethods.common.getAttributeData(userData);

      const identifyResp = await fetch(`${ulConstants.url}/identify`, {
        method: "POST",
        body: JSON.stringify({
          currentUserInfo: {
            user_tracking_id: id,
            user_type: "identified",
            user_details: userData,
          },
          anonymous_tracking_id,
          attributes: bodyData,
          category: "custom",
          account_tracking_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      //if the request was successful then update the currentUserInfo in window obj
      const identifyRespData = await identifyResp.json();
      if (identifyRespData.status) {
        window.currentUserInfo = {
          user_tracking_id: id,
          user_type: "identified",
          user_details: userData,
        };
        userloveDL.push(userData);
        localStorage.setItem(
          "currentUserInfo",
          JSON.stringify(window.currentUserInfo)
        );
        ulPageData.featureProgress = [
          ...identifyRespData.data.featureProgressReport,
        ];
        userloveMethods.common.handleProgressAfterMerging();
        userloveMethods.common.evaluateAllConditions();
      }
    } catch (error) {
      console.log("error", error.message);
    }
  },

  trackMe: async () => {
    //Send the data to the server
    // type & key
    const meDetails = await userloveMethods.sessionMethods.getSessionDetails();
    let bodyData = userloveMethods.common.getAttributeData(meDetails);
    userloveDL.push(meDetails);
    //API Call to trackDetails against user_id (created above)
    try {
      const trackMeResp = await fetch(`${ulConstants.url}/my-page-view`, {
        body: JSON.stringify({
          session_details: meDetails,
          currentUserInfo,
          attributes: bodyData,
          category: "browser_attributes",
          account_tracking_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
      });
      userlove.track({
        event: ulConstants.events.pageViewed,
        data: { page_url: userloveDL.get("page_url") },
      });
      const trackMeRespData = await trackMeResp.json();
      if (trackMeRespData.status) {
        sessionStorage.setItem("session_id", trackMeRespData.data.session_id);
        ulPageData.featureProgress = trackMeRespData.data.featureProgressReport;
      }
    } catch (error) {
      console.log("error", error.message);
    }
  },

  track: async ({ event, data }) => {
    try {
      let bodyData = userloveMethods.common.getAttributeData(data);
      const trackResp = await fetch(`${ulConstants.url}/page-view`, {
        body: JSON.stringify({
          event,
          data,
          currentUserInfo,
          attributes: bodyData,
          category: "custom",
          account_tracking_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
      });
      userloveDL.push({
        event,
        ...data,
      });
      userloveDL.firedEvents.push(event);

      const respData = await trackResp.json();
      if (respData.status) {
        //call function to check if any flow can be triggered
        //updating feature progress with updated data
        ulPageData.featureProgress = [...respData.data.featureProgressReport];
        //update session_id in sessionStorage if it doesn't exist
        ulPageData.pageViewed = [...respData.data.pageViewTracking];
        if (!sessionStorage.getItem("session_id")) {
          sessionStorage.setItem("session_id", respData.data.session_id);
        }
        if (!ulConstants.session.socketStarted) {
          pingPong();
        }
        userloveMethods.checklist.conditionMethods.handleChecklistEvents(
          event,
          data
        );
        userloveMethods.productTour.conditionMethods.checkProductTourGoal(
          event,
          data
        );
        userloveMethods.nps.conditionMethods.isNpsCompleted(event, data);

        userloveMethods.common.evaluateAllConditions();
      }
    } catch (error) {
      console.log("error", error.message);
    }
  },

  launchChecklist: (checklist_id) => {
    //check if checklist has been already triggered (need to be solved)
    let currentChecklist = ulPageData.triggeredFlowsForThisPage.checklists.find(
      (chk) => chk.checklist_id === checklist_id
    );
    if (!currentChecklist) {
      ulPageData.triggeredFlowsForThisPage.checklists.push({
        checklist_id: checklist_id,
        checklist_items: [],
      });
      userlove.track({
        event: ulConstants.events.checklist.checklistTriggered,
        data: { checklist_id: checklist_id },
      });
      let checklistInLive = LiveChecklists.find(
        (chk) => chk.checklist_id === checklist_id
      );
      iframeHandlerFunctions.checklist.createChecklist(checklistInLive);
    }
  },

  hideChecklist: (checklist_id) => {
    userlove.track({
      event: ulConstants.events.checklist.checklistDismissed,
      data: {
        checklist_id,
      },
    });
    iframeHandlerFunctions.checklist.removeChecklist(checklist_id);
  },

  launchProductTour: async (product_tour_id) => {
    let productTourInLive = LiveProductTours.find(
      (tour) => tour.product_tour_id === product_tour_id
    );
    let triggeredProductTour =
      ulPageData.triggeredFlowsForThisPage.productTours.find(
        (tour) => tour.product_tour_id === product_tour_id
      );
    if (productTourInLive && !triggeredProductTour) {
      ulPageData.triggeredFlowsForThisPage.productTours.push({
        product_tour_id,
        seen_steps: [],
      });
      userlove.track({
        event: ulConstants.events.productTour.productTourLaunched,
        data: {
          product_tour_id,
        },
      });
      ulPageData.launchedProductTour = productTourInLive;
      if (productTourInLive.product_tour_steps?.length > 0) {
        iframeHandlerFunctions.productTour.startProductTour(productTourInLive);
      }
    }
  },
  launchNPS: (nps) => {
    let npsInLiveData = LiveNps.find((nps) => nps.nps_id === nps.nps_id);
    let triggeredNps = ulPageData.triggeredFlowsForThisPage.NPS.find(
      (nps) => nps.nps_id === nps.nps_id
    );
    if (npsInLiveData && !triggeredNps) {
      ulPageData.triggeredFlowsForThisPage.NPS.push({
        nps_id: nps.nps_id,
        completed_nps_questions: [],
      });
    }
    userlove.track({
      event: ulConstants.events.nps.npsTriggered,
      data: { nps_id: nps.nps_id },
    });
    if (nps.nps_question?.length > 0) {
      ulPageData.launchedNps = nps;
      userloveMethods.nps.iframeMethods.createNPS(nps);
    }
  },
  hideNPS: (nps) => {
    let { nps_id, nps_question } = nps;
    if (
      nps_question.nps_element_type_key ===
      ulConstants.nps.questionType.endofSurvey
    ) {
      iframeHandlerFunctions.nps.removeNpsIframe(nps_id);
    } else {
      userlove.track({
        event: ulConstants.events.nps.npsDismissed,
        data: {
          nps_id: nps_id,
        },
      });
      iframeHandlerFunctions.nps.removeNpsIframe(nps_id);
    }
    // find nps from livenps
    // let npsInLiveData = LiveNps.find((nps) => nps.nps_id === nps.nps_id);
    // // get last question from nps_question array
    // let lastQuestion =
    //   npsInLiveData.nps_question[npsInLiveData.nps_question.length - 1];

    // // if last question is same as nps_question then hide nps
    // if (lastQuestion.sort_order === nps.nps_question.sort_order) {
    //   iframeHandlerFunctions.nps.removeNpsIframe(nps.nps_id);
    // } else {
    //   userlove.track({
    //     event: ulConstants.events.nps.npsDismissed,
    //     data: {
    //       nps_id: nps.nps_id,
    //     },
    //   });
    //   iframeHandlerFunctions.nps.removeNpsIframe(nps.nps_id);
    // }
  },
  checklist: {
    operatorMethods: {
      hasChecklistBeenCompleted: (checklist_id) => {
        const checklistProgressOfUser =
          userloveMethods.common.findFeatureProgressByFeatureType("checklist");
        if (!checklistProgressOfUser) {
          return false;
        } else {
          const checklistProgressArray =
            checklistProgressOfUser.feature_progress;
          const currentChecklistInProgress = checklistProgressArray?.find(
            (chk_p) => chk_p.checklist_id === checklist_id
          );
          if (
            currentChecklistInProgress &&
            currentChecklistInProgress.is_completed
          ) {
            return true;
          } else {
            return false;
          }
        }
      },
      hasChecklistBeenSkipped: (checklist_id) => {
        const checklistProgressOfUser =
          userloveMethods.common.findFeatureProgressByFeatureType("checklist");
        if (!checklistProgressOfUser) {
          return false;
        } else {
          const checklistProgressArray =
            checklistProgressOfUser.feature_progress;
          const currentChecklistInProgress = checklistProgressArray.find(
            (chk_p) => chk_p.checklist_id === checklist_id
          );
          if (
            currentChecklistInProgress &&
            currentChecklistInProgress.is_dismissed
          ) {
            return true;
          } else {
            return false;
          }
        }
      },
      hasChecklistNotBeenSeen: (checklist_id) => {
        const checklistProgressOfUser =
          userloveMethods.common.findFeatureProgressByFeatureType("checklist");
        if (!checklistProgressOfUser) {
          return true;
        } else {
          const checklistProgressArray =
            checklistProgressOfUser.feature_progress;
          const currentChecklistInProgress = checklistProgressArray.find(
            (chk_p) => chk_p.checklist_id === checklist_id
          );
          if (!currentChecklistInProgress) {
            return true;
          } else {
            return false;
          }
        }
      },
      isChecklistInProgress: (checklist_id) => {
        const checklistProgressOfUser =
          userloveMethods.common.findFeatureProgressByFeatureType("checklist");
        if (!checklistProgressOfUser) {
          return false;
        } else {
          const checklistProgressArray =
            checklistProgressOfUser.feature_progress;
          const currentChecklistInProgress = checklistProgressArray.find(
            (chk_p) => chk_p.checklist_id === checklist_id
          );
          if (
            currentChecklistInProgress &&
            currentChecklistInProgress.checklist_items.length > 0
          ) {
            return true;
          } else {
            return false;
          }
        }
      },
    },
    triggerMethods: {
      willChecklistsBeTriggered: () => {
        let untriggeredChecklists =
          userloveMethods.checklist.triggerMethods.getUntriggeredChecklists();
        untriggeredChecklists.forEach((checklist) => {
          //check if checklist is to be shown to all users or a specific segment
          let resultOfSegmentConditions = false;
          if (!checklist.segment_all_user) {
            //check if user belongs in the selected segment
            if (checklist.segment) {
              resultOfSegmentConditions =
                userloveMethods.common.validatingSegmentConditions(
                  checklist.segment
                );
            }
          } else {
            resultOfSegmentConditions = true;
          }
          let resultOfTriggerConditions = false;
          //check if checklist is to be shown on all pages or specific pages
          if (checklist && checklist.checklist_trigger) {
            if (checklist.checklist_trigger.all_pages) {
              resultOfTriggerConditions = true;
            } else {
              //evaluate result of conditions for checklist against pathname
              resultOfTriggerConditions =
                userloveMethods.common.checkingTriggerConditions(
                  checklist.checklist_trigger.checklist_trigger_conditions,
                  checklist.checklist_trigger.conditional_operator,
                  userloveDL.get("page_path")
                );
            }
          }
          if (resultOfTriggerConditions && resultOfSegmentConditions) {
            //check for delay and scroll percentage
            if (checklist.checklist_trigger.display_trigger === "delay") {
              setTimeout(() => {
                userlove.launchChecklist(checklist.checklist_id);
              }, checklist.checklist_trigger.display_trigger_value * 1000);
            } else if (
              checklist.checklist_trigger.display_trigger ===
                "scroll percentage" &&
              Number(checklist.checklist_trigger.display_trigger_value) > 0
            ) {
              const ac = new AbortController();
              const { signal } = ac;
              document.addEventListener(
                "scroll",
                () => {
                  scrollPercent = userloveMethods.common.scrollTrigger();
                  if (
                    scrollPercent >=
                    Number(checklist.checklist_trigger.display_trigger_value)
                  ) {
                    userlove.launchChecklist(checklist.checklist_id);
                    //remove scroll event listener once checklist is triggered
                    ac.abort();
                  }
                },
                { signal }
              );
            } else if (
              checklist.checklist_trigger.display_trigger === "exit intent"
            ) {
              const ac = new AbortController();
              const { signal } = ac;
              document.addEventListener(
                "mouseleave",
                (event) => {
                  if (
                    event.clientY <= 0 ||
                    event.clientX <= 0 ||
                    event.clientX >= window.innerWidth ||
                    event.clientY >= window.innerHeight
                  ) {
                    userlove.launchChecklist(checklist.checklist_id);
                    ac.abort();
                  }
                },
                { signal }
              );
            } else {
              userlove.launchChecklist(checklist.checklist_id);
            }
          }
        });
      },
      getUntriggeredChecklists: () => {
        //filter out checklists that are already triggered on this page
        let untriggeredChecklists = LiveChecklists.filter(
          (chk) =>
            !ulPageData.triggeredFlowsForThisPage.checklists.find(
              (item) => item.checklist_id === chk.checklist_id
            )
        );
        //check if untriggered checklist has been completed or dismissed in user feature progress
        let progressForChecklist =
          userloveMethods.common.findFeatureProgressByFeatureType(
            "checklist"
          )?.feature_progress;
        untriggeredChecklists = untriggeredChecklists.filter((chk) => {
          let currentChecklistInProgress = progressForChecklist?.find(
            (item) => item.checklist_id === chk.checklist_id
          );
          if (!currentChecklistInProgress) {
            return true;
          } else if (
            currentChecklistInProgress.is_completed ||
            currentChecklistInProgress.is_dismissed
          ) {
            return false;
          } else {
            return true;
          }
        });
        return untriggeredChecklists;
      },
    },
    conditionMethods: {
      checklistAttributeCondition: (attrCondition) => {
        if (!attrCondition.value) {
          return false;
        }
        if (
          attrCondition.condition.condition_name ===
          ulConstants.condition.checklist.hasBeenSkipped
        ) {
          return userloveMethods.checklist.operatorMethods.hasChecklistBeenSkipped(
            attrCondition.value.checklist_id
          );
        } else if (
          attrCondition.condition.condition_name ===
          ulConstants.condition.checklist.hasNotBeenSeen
        ) {
          return userloveMethods.checklist.operatorMethods.hasChecklistNotBeenSeen(
            attrCondition.value.checklist_id
          );
        } else if (
          attrCondition.condition.condition_name ===
          ulConstants.condition.checklist.hasBeenCompleted
        ) {
          return userloveMethods.checklist.operatorMethods.hasChecklistBeenCompleted(
            attrCondition.value.checklist_id
          );
        } else if (
          attrCondition.condition.condition_name ===
          ulConstants.condition.checklist.isInProgress
        ) {
          return userloveMethods.checklist.operatorMethods.isChecklistInProgress(
            attrCondition.value.checklist_id
          );
        }
      },
      isChecklistCompleted: (checklist_id) => {
        const foundChecklistInLiveData = LiveChecklists.find(
          (chk) => chk.checklist_id === checklist_id
        );
        const checklistProgress =
          userloveMethods.common.findFeatureProgressByFeatureType("checklist");
        const progressForCurrentChecklist = checklistProgress
          ? checklistProgress.feature_progress.find(
              (chk_p) => chk_p.checklist_id === checklist_id
            )
          : {};
        if (
          foundChecklistInLiveData &&
          progressForCurrentChecklist &&
          foundChecklistInLiveData.checklist_item.length ===
            progressForCurrentChecklist.checklist_items.length
        ) {
          userlove.track({
            event: ulConstants.events.checklist.checklistCompleted,
            data: {
              checklist_id,
            },
          });
        }
      },
      isChecklistItemCompleted: () => {
        let checklistsInProgress =
          userloveMethods.common.findFeatureProgressByFeatureType("checklist");
        /*filter out checklists from feature progress which are neither dismissed nor completed to check if their items are completed*/
        checklistsInProgress = checklistsInProgress
          ? checklistsInProgress.feature_progress?.filter(
              (chk) => !chk.is_dismissed && !chk.is_completed
            )
          : [];
        checklistsInProgress?.forEach((chk) => {
          let completedSteps = [];
          let liveChecklist = LiveChecklists.find(
            (live_chk) => live_chk.checklist_id === chk.checklist_id
          );
          let checklistItems =
            liveChecklist && liveChecklist.checklist_item
              ? liveChecklist.checklist_item
              : [];
          checklistItems.forEach((chk_item) => {
            //check if this checklist_item is not already present in the progress of current checklist
            let checklistItemInProgress = chk.checklist_items.find(
              (item) => item.checklist_item_id === chk_item.checklist_item_id
            );
            let completedItemsOnPage =
              userloveMethods.checklist.conditionMethods.getChecklistProgressOnPage(
                chk.checklist_id
              );
            if (
              !checklistItemInProgress &&
              completedItemsOnPage &&
              !completedItemsOnPage.includes(chk_item.checklist_item_id)
            ) {
              if (chk_item.mark_completed_flow_started) {
                //check if flow in chk_item.product_tour exists in feature progress.
                let productTourProgress =
                  userloveMethods.common.findFeatureProgressByFeatureType(
                    "product_tour"
                  );
                productTourProgress = productTourProgress
                  ? productTourProgress.feature_progress
                  : [];

                let isProductTourLaunched = productTourProgress.find(
                  (pt) =>
                    pt.product_tour_id === chk_item.product_tour.product_tour_id
                );
                //if product tour was found in feature progress, mark checklist item as completed
                if (isProductTourLaunched) {
                  completedSteps.push({
                    checklist_item_id: chk_item.checklist_item_id,
                  });
                  let currentChecklistIndex =
                    ulPageData.triggeredFlowsForThisPage.checklists.findIndex(
                      (ele) => ele.checklist_id === chk.checklist_id
                    );
                  if (currentChecklistIndex > -1) {
                    ulPageData.triggeredFlowsForThisPage.checklists[
                      currentChecklistIndex
                    ].checklist_items.push(chk_item.checklist_item_id);
                  }
                }
              } else if (chk_item.mark_completed_on_condition) {
                //check validity of all conditions in checklist_item_conditions.
                let resultOfConditions =
                  userloveMethods.common.validatingAttributeConditions({
                    attrConditions: chk_item.checklist_item_conditions,
                    conditional_operator: chk_item.conditional_operator,
                  });
                if (resultOfConditions) {
                  //if result was of conditions was true, mark this item as completed
                  completedSteps.push({
                    checklist_item_id: chk_item.checklist_item_id,
                  });
                  let currentChecklistIndex =
                    ulPageData.triggeredFlowsForThisPage.checklists.findIndex(
                      (ele) => ele.checklist_id === chk.checklist_id
                    );
                  if (currentChecklistIndex > -1) {
                    ulPageData.triggeredFlowsForThisPage.checklists[
                      currentChecklistIndex
                    ].checklist_items.push(chk_item.checklist_item_id);
                  }
                }
              }
            } else {
              iframeHandlerFunctions.checklist.markCompletedChecklistItem(
                chk.checklist_id,
                chk_item.checklist_item_id
              );
            }
          });
          if (completedSteps.length > 1) {
            userlove.track({
              event: ulConstants.events.checklist.checklistItemsCompletedBulk,
              data: {
                checklist_id: chk.checklist_id,
                completed_steps: completedSteps,
              },
            });
          } else if (completedSteps.length === 1) {
            userlove.track({
              event: ulConstants.events.checklist.checklistItemCompleted,
              data: {
                checklist_id: chk.checklist_id,
                completed_step: {
                  checklist_item_id: completedSteps[0].checklist_item_id,
                },
              },
            });
          }
        });
      },
      getChecklistProgressOnPage: (checklist_id) => {
        let currentChecklistOnPage =
          ulPageData.triggeredFlowsForThisPage.checklists.find(
            (chk) => chk.checklist_id === checklist_id
          );

        return currentChecklistOnPage
          ? currentChecklistOnPage.checklist_items
          : null;
      },
      handleChecklistEvents: (event, data) => {
        if (event === ulConstants.events.checklist.checklistItemCompleted) {
          iframeHandlerFunctions.checklist.markCompletedChecklistItem(
            data.checklist_id,
            data.completed_step.checklist_item_id
          );
          userloveMethods.checklist.conditionMethods.isChecklistCompleted(
            data.checklist_id
          );
        } else if (event === ulConstants.events.checklist.checklistCompleted) {
          iframeHandlerFunctions.checklist.markCompletedChecklist(
            data.checklist_id
          );
        } else if (
          event === ulConstants.events.checklist.checklistItemsCompletedBulk
        ) {
          data.completed_steps.forEach((item) => {
            iframeHandlerFunctions.checklist.markCompletedChecklistItem(
              data.checklist_id,
              item.checklist_item_id
            );
          });
          userloveMethods.checklist.conditionMethods.isChecklistCompleted(
            data.checklist_id
          );
        }
      },
    },
  },
  nps: {
    triggerMethods: {
      willNpsBeTriggered: () => {
        let untriggeredNps =
          userloveMethods.nps.triggerMethods.getUntriggeredNps();

        untriggeredNps.forEach((nps) => {
          let resultOfSegmentConditions = false;
          if (!nps.segment_all_user) {
            if (nps.segment) {
              resultOfSegmentConditions =
                userloveMethods.common.validatingSegmentConditions(nps.segment);
            }
          } else {
            resultOfSegmentConditions = true;
          }
          let resultOfTriggerConditions = false;
          if (nps.nps_trigger?.all_pages) {
            resultOfTriggerConditions = true;
          } else {
            resultOfTriggerConditions =
              userloveMethods.common.checkingTriggerConditions(
                nps.nps_trigger?.nps_trigger_conditions,
                nps.nps_trigger?.conditional_operator,
                userloveDL.get("page_path")
              );
          }

          /////////// PAGES VISITED BEFORE SURVEY APPEREARANCE ///////////

          let resultofPageViewConditions = true;
          if (
            resultOfTriggerConditions &&
            resultOfSegmentConditions &&
            nps.nps_trigger.pages_before_survey_appearence &&
            nps.nps_trigger.pages_before_survey_appearence > 0
          ) {
            // call this function to check if user has visited required number of pages before survey appears
            resultofPageViewConditions =
              userloveMethods.nps.triggerMethods.checkNpsPageViewCondition(nps);
          }
          // find feature progress of nps
          let npsProgress =
            userloveMethods.common.findFeatureProgressByFeatureType("nps");

          npsProgress = npsProgress ? npsProgress.feature_progress : [];
          let lastTriggeredNpsEntry;
          // find last progress for this nps
          if (npsProgress.length !== 0) {
            npsProgress = npsProgress.filter(
              (npsProgress) => npsProgress.nps_id === nps.nps_id
            );
            lastTriggeredNpsEntry = npsProgress.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )[0];
          } else {
            lastTriggeredNpsEntry = null;
          }

          let resultOfAllTriggerConditions = false;
          let resultOfShowNpsAgain = false;
          let resultOfShowNpsAfterDismissed = false;

          if (
            resultOfTriggerConditions &&
            resultOfSegmentConditions &&
            resultofPageViewConditions &&
            lastTriggeredNpsEntry?.completed_at &&
            nps.nps_trigger.survey_appearence_again_after > 0
          ) {
            resultOfShowNpsAgain =
              userloveMethods.nps.triggerMethods.willCompletedNpsShowAgain(
                nps,
                lastTriggeredNpsEntry
              );
          } else if (
            resultOfTriggerConditions &&
            resultOfSegmentConditions &&
            resultofPageViewConditions &&
            lastTriggeredNpsEntry?.dismissed_at &&
            nps.nps_trigger.survey_suppressed_days > 0
          ) {
            resultOfShowNpsAfterDismissed =
              userloveMethods.nps.triggerMethods.willDismissedNpsShowAgain(
                nps,
                lastTriggeredNpsEntry
              );
          } else if (
            resultOfTriggerConditions &&
            resultOfSegmentConditions &&
            resultofPageViewConditions &&
            !lastTriggeredNpsEntry
          ) {
            resultOfAllTriggerConditions = true;
          } else if (
            !lastTriggeredNpsEntry?.completed_at &&
            !lastTriggeredNpsEntry?.dismissed_at
          ) {
            resultOfAllTriggerConditions = true;
          }

          if (resultOfShowNpsAgain || resultOfShowNpsAfterDismissed) {
            resultOfAllTriggerConditions = true;
          }

          if (resultOfAllTriggerConditions) {
            if (nps.nps_trigger.display_trigger === "delay") {
              setTimeout(() => {
                if (!ulPageData.launchedNps) {
                  userlove.launchNPS(nps);
                }
              }, nps.nps_trigger.display_trigger_value * 1000);
            } else if (
              nps.nps_trigger.display_trigger === "scroll percentage" &&
              Number(nps.nps_trigger.display_trigger_value) > 0
            ) {
              const ac = new AbortController();
              const { signal } = ac;
              document.addEventListener(
                "scroll",
                () => {
                  scrollPercent = userloveMethods.common.scrollTrigger();
                  if (
                    scrollPercent >=
                    Number(nps.nps_trigger.display_trigger_value)
                  ) {
                    if (!ulPageData.launchedNps) {
                      userlove.launchNPS(nps);
                    }
                    //remove scroll event listener once nps is triggered
                    ac.abort();
                  }
                },
                { signal }
              );
            } else if (nps.nps_trigger.display_trigger === "exit intent") {
              const ac = new AbortController();
              const { signal } = ac;
              document.addEventListener(
                "mouseleave",
                (event) => {
                  if (
                    event.clientY <= 0 ||
                    event.clientX <= 0 ||
                    event.clientX >= window.innerWidth ||
                    event.clientY >= window.innerHeight
                  ) {
                    if (!ulPageData.launchedNps) {
                      userlove.launchNPS(nps);
                    }
                    ac.abort();
                  }
                },
                { signal }
              );
            } else {
              if (!ulPageData.launchedNps) {
                userlove.launchNPS(nps);
              }
            }
          }
        });
      },
      getUntriggeredNps: () => {
        //filter out nps that are never triggered on this page
        let untriggeredNps = LiveNps.filter(
          (nps) =>
            !ulPageData.triggeredFlowsForThisPage.NPS.find(
              (item) => item.nps_id === nps.nps_id
            )
        );
        return untriggeredNps;
      },
      willCompletedNpsShowAgain: (nps, completedNps) => {
        // find recent completed survey by completed_at

        let showNpsSurvey;
        showNpsSurvey = nps.nps_trigger.survey_appearence_again_after;
        let lastCompletedAt = new Date(completedNps.completed_at);
        let now = new Date();

        let diff = now.getTime() - lastCompletedAt.getTime();

        // convert different in days
        let diffInDays = Math.round(diff / (1000 * 60 * 60 * 24));
        if (diffInDays >= showNpsSurvey) {
          // Survey can be triggered
          return (showNpsSurvey = true);
          // userlove.launchNPS(nps);
        } else {
          return (showNpsSurvey = false);
          // Survey can not be triggered
        }
      },
      willDismissedNpsShowAgain: (nps, dismissedNps) => {
        //filter out last dismissed nps

        let showNpsSurvey;

        let supperessedDays = nps.nps_trigger.survey_suppressed_days;
        let lastDismissedAt = new Date(dismissedNps.dismissed_at);
        let now = new Date();

        // difference in days
        let diff = now.getTime() - lastDismissedAt.getTime();
        let diffInDays = Math.round(diff / (1000 * 60 * 60 * 24));
        if (diffInDays >= supperessedDays) {
          // Survey can be triggered
          return (showNpsSurvey = true);
        } else {
          // Survey can not be triggered
          return (showNpsSurvey = false);
        }
      },
      checkNpsPageViewCondition: (nps) => {
        let resultofPageViewConditions;
        const uniquePageViewed = [
          ...new Set(ulPageData.pageViewed.map((item) => item.page_url)),
        ];

        let pagesBeforeSurveyAppears =
          nps.nps_trigger.pages_before_survey_appearence;

        let pagesVisitedBeforeSurveyAppears = uniquePageViewed.length;

        if (pagesVisitedBeforeSurveyAppears >= pagesBeforeSurveyAppears) {
          // Survey will be triggered
          return (resultofPageViewConditions = true);
        } else {
          // Survey can not be triggered
          return (resultofPageViewConditions = false);
        }
      },
    },
    conditionMethods: {
      isNpsCompleted: (event, data) => {
        if (event === ulConstants.events.nps.npsQuestionCompleted) {
          let { nps_id } = data;
          const findNpsFromLiveNps = LiveNps.find(
            (nps) => nps.nps_id === nps_id
          );
          const findNpsInProgress =
            userloveMethods.common.findFeatureProgressByFeatureType("nps");
          let findCurrentNpsProgress =
            findNpsInProgress.feature_progress.filter(
              (nps) =>
                nps.nps_id === nps_id && !nps.completed_at && !nps.dismissed_at
            );
          findCurrentNpsProgress = findCurrentNpsProgress.sort(
            (a, b) => b.created_at - a.created_at
          )[0];

          if (
            findNpsFromLiveNps &&
            findCurrentNpsProgress &&
            findCurrentNpsProgress.progress_json.nps_questions.every(
              (item) => item.answer
            ) &&
            findNpsFromLiveNps.nps_question.length ===
              findCurrentNpsProgress.progress_json.nps_questions.length
          ) {
            userloveMethods.track({
              event: ulConstants.events.nps.npsCompleted,
              data: {
                nps_id,
              },
            });
            iframeHandlerFunctions.nps.removeNpsIframe(nps_id);
          }
        }
      },
      npsQuestionCompleted: (nps_answer_data, nps_question) => {
        userlove.track({
          event: ulConstants.events.nps.npsQuestionCompleted,
          data: {
            nps_id: nps_answer_data.nps_id,
            completed_question: {
              ...nps_answer_data,
              sort_order: nps_question.sort_order,
            },
          },
        });
      },
    },
    iframeMethods: {
      createNPS: (nps) => {
        const ifr = document.createElement("iframe");
        ifr.id = `ul-nps-${nps.nps_id}`;
        ifr.style.margin = `${nps.nps_appearance.position.replaceAll(
          "0",
          "15px"
        )}`;
        ifr.style.border = 0;
        ifr.style.width = `600px`;
        ifr.style.transition = "all 0.2s ease-in-out";
        ifr.style.top = `0`;
        ifr.style.left = `0`;
        ifr.style.right = `0`;
        ifr.style.bottom = `0`;
        ifr.style.position = `fixed `;
        ifr.style.background = `${nps.nps_appearance.background_color}`;
        ifr.style.zIndex = `999999`;
        ifr.style.boxShadow = "0px 2px 6px -1px rgb(0 0 0 / 10%)";
        ifr.style.opacity = "1";

        document.body.appendChild(ifr);
        try {
          iframeData.nps(nps);
        } catch (error) {
          console.error("error", error.message);
        }
      },
    },
  },
  userAttributes: {
    userAttributeCondition: (attrCondition) => {
      if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.startsWith
      ) {
        return userloveMethods.common.operatorMethods
          .startsWith(attrCondition.value)
          .test(userloveDL.get(attrCondition.attribute.attribute_key));
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.doesNotStartWith
      ) {
        return !userloveMethods.common.operatorMethods
          .startsWith(attrCondition.value)
          .test(userloveDL.get(attrCondition.attribute.attribute_key));
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.endsWith
      ) {
        return userloveMethods.common.operatorMethods
          .endsWith(attrCondition.value)
          .test(userloveDL.get(attrCondition.attribute.attribute_key));
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.doesNotEndWith
      ) {
        return !userloveMethods.common.operatorMethods
          .endsWith(attrCondition.value)
          .test(userloveDL.get(attrCondition.attribute.attribute_key));
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.contains
      ) {
        return userloveMethods.common.operatorMethods
          .contains(attrCondition.value)
          .test(userloveDL.get(attrCondition.attribute.attribute_key));
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.doesNotContain
      ) {
        return !userloveMethods.common.operatorMethods
          .contains(attrCondition.value)
          .test(userloveDL.get(attrCondition.attribute.attribute_key));
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.matches
      ) {
        return userloveMethods.common.operatorMethods
          .match(attrCondition.value)
          .test(userloveDL.get(attrCondition.attribute.attribute_key));
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.doesNotMatch
      ) {
        return !userloveMethods.common.operatorMethods
          .match(attrCondition.value)
          .test(userloveDL.get(attrCondition.attribute.attribute_key));
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.equals
      ) {
        return userloveMethods.common.operatorMethods.equals(
          attrCondition.value,
          userloveDL.get(attrCondition.attribute.attribute_key)
        );
      } else if (
        attrCondition.condition.condition_name ===
        ulConstants.condition.user.doesNotEqual
      ) {
        return !userloveMethods.common.operatorMethods.equals(
          attrCondition.value,
          userloveDL.get(attrCondition.attribute.attribute_key)
        );
      }
    },
  },

  language: {
    conditionMethods: {
      languageAttributeCondition: (attrCondition) => {
        if (
          attrCondition.condition.condition_name ===
          ulConstants.condition.language.is
        ) {
          return userloveMethods.language.operatorMethods.isUserLanguage(
            attrCondition.value?.code,
            attrCondition.attribute.attribute_key
          );
        } else if (
          attrCondition.condition.condition_name ===
          ulConstants.condition.language.isNot
        ) {
          return userloveMethods.language.operatorMethods.isNotUserLanguage(
            attrCondition.value?.code,
            attrCondition.attribute.attribute_key
          );
        }
      },
    },
    operatorMethods: {
      isUserLanguage: (languageCode, attribute_key) => {
        if (languageCode) {
          return userloveDL.get(attribute_key)?.includes(languageCode);
        } else {
          return false;
        }
      },
      isNotUserLanguage: (languageCode, attribute_key) => {
        if (languageCode) {
          return !userloveDL.get(attribute_key)?.includes(languageCode);
        } else {
          return false;
        }
      },
    },
  },

  segment: {
    operatorMethods: {
      userMatchesSegment: (segment) => {
        return ulPageData.matchedSegments.includes(segment.segment_id);
      },
      userDoesNotMatchSegment: (segment) => {
        return !ulPageData.matchedSegments.includes(segment.segment_id);
      },
    },
    conditionMethods: {
      doesUserMatchSegment: () => {
        LiveSegments.forEach((segment) => {
          if (!ulPageData.matchedSegments.includes(segment.segment_id)) {
            let resultOfSegment =
              userloveMethods.common.validatingAttributeConditions({
                attrConditions: segment.segment_condition,
                conditional_operator: segment.conditional_operator,
              });
            if (resultOfSegment) {
              ulPageData.matchedSegments.push(segment.segment_id);
              userloveMethods.common.evaluateAllConditions();
            }
          }
        });
      },
      segmentAttributeConditions: (attrCondition) => {
        if (attrCondition.condition.condition_name === "matches") {
          return userloveMethods.segment.operatorMethods.userMatchesSegment(
            attrCondition.value
          );
        } else if (attrCondition.condition.condition_name === "doesn't match") {
          return userloveMethods.segment.operatorMethods.userDoesNotMatchSegment(
            attrCondition.value
          );
        }
      },
    },
  },

  goal: {
    conditionMethods: {
      hasUserReachedGoals: () => {
        LiveGoals.forEach((goal) => {
          if (!ulPageData.reachedGoals.includes(goal.goal_id)) {
            let resultOfGoal =
              userloveMethods.common.validatingAttributeConditions({
                attrConditions: goal.goal_conditions,
                conditional_operator: goal.conditional_operator,
              });
            if (resultOfGoal) {
              ulPageData.reachedGoals.push(goal.goal_id);
              userloveMethods.common.evaluateAllConditions();
            }
          }
        });
      },
    },
  },

  productTour: {
    operatorMethods: {
      hasProductTourBeenCompleted: (product_tour_id) => {
        const productTourProgress =
          userloveMethods.common.findFeatureProgressByFeatureType(
            "product_tour"
          );
        if (!productTourProgress) {
          return false;
        } else {
          const currentTourInProgress =
            productTourProgress.feature_progress.find(
              (pt) => pt.product_tour_id === product_tour_id
            );
          if (currentTourInProgress && currentTourInProgress.is_completed) {
            return true;
          } else {
            return false;
          }
        }
      },

      hasProductTourNotBeenCompleted: (product_tour_id) => {
        const productTourProgress =
          userloveMethods.common.findFeatureProgressByFeatureType(
            "product_tour"
          );
        if (!productTourProgress) {
          return true;
        } else {
          const currentTourInProgress =
            productTourProgress.feature_progress.find(
              (pt) => pt.product_tour_id === product_tour_id
            );
          if (!currentTourInProgress) {
            return true;
          } else if (!currentTourInProgress.is_completed) {
            return true;
          } else if (currentTourInProgress.is_completed) {
            return false;
          }
        }
      },
    },
    conditionMethods: {
      productTourAttributeCondition: (attrCondition) => {
        if (
          attrCondition.condition.condition_name ===
          ulConstants.condition.productTour.hasBeenCompleted
        ) {
          return userloveMethods.productTour.operatorMethods.hasProductTourBeenCompleted(
            attrCondition.value.product_tour_id
          );
        } else if (
          attrCondition.condition.condition_name ===
          ulConstants.condition.productTour.hasNotBeenCompleted
        ) {
          return userloveMethods.productTour.operatorMethods.hasProductTourNotBeenCompleted(
            attrCondition.value.product_tour_id
          );
        }
      },
      checkProductTourGoal: (event, data) => {
        if (event === ulConstants.events.productTour.productTourCompleted) {
          //get live data of the completed product tour
          const productTour = LiveProductTours.find(
            (tour) => tour.product_tour_id === data.product_tour_id
          );
          if (productTour) {
            if (productTour.have_goal) {
              //check if user has reached the goal given in product tour
              userloveMethods.common.validatingGoalConditions(productTour.goal);
            }
          }
        }
      },
    },
    triggerMethods: {
      willProductToursBeTriggered: () => {
        //product tours for which conditions are satisfied
        let productToursToBeLaunched = [];
        //filter out triggered, completed and skipped product tours
        let untriggeredProductTours =
          userloveMethods.productTour.triggerMethods.getUntriggeredProductTours();
        untriggeredProductTours.forEach(async (tour) => {
          //check if segment conditions for product tour are satisfied.
          let resultOfSegmentConditions = false;
          if (tour.segment_all_user) {
            resultOfSegmentConditions = true;
          } else if (tour.segment) {
            resultOfSegmentConditions =
              userloveMethods.common.validatingSegmentConditions(tour.segment);
          }
          //check if trigger conditions of product tour are satisfied.
          let resultOfTriggerConditions = false;
          if (tour?.product_tour_trigger?.trigger_type === "page") {
            if (tour.product_tour_trigger.all_page) {
              resultOfTriggerConditions = true;
            } else if (tour.product_tour_trigger.conditions) {
              //evaluate all conditions in product_tour_trigger
              resultOfTriggerConditions =
                userloveMethods.common.checkingTriggerConditions(
                  tour.product_tour_trigger.conditions,
                  tour.product_tour_trigger.conditional_operator,
                  userloveDL.get("page_path")
                );
            }
          } else if (tour?.product_tour_trigger?.trigger_type === "event") {
            //call api to get all events that have been tracked for the user
            let allEventsOfUser =
              await userloveMethods.common.getAllTrackedEvents();
            let productTourEvent =
              tour.product_tour_trigger.conditions?.at(0)?.event_name;
            let firedEvent = allEventsOfUser?.find(
              (userEvent) => userEvent.events.event_name === productTourEvent
            );
            if (firedEvent) {
              resultOfTriggerConditions = true;
            } else {
              resultOfTriggerConditions = false;
            }
          }
          if (resultOfSegmentConditions && resultOfTriggerConditions) {
            productToursToBeLaunched.push(tour);
          }
        });
        let tour;
        if (
          !ulPageData.launchedProductTour &&
          productToursToBeLaunched.length > 0
        ) {
          if (productToursToBeLaunched.length > 1) {
            let sortedProductTours = productToursToBeLaunched.sort((a, b) => {
              let first = a.product_tour_trigger.flow_priority || 0;
              let second = b.product_tour_trigger.flow_priority || 0;

              return first - second;
            });
            tour = sortedProductTours.shift();
          } else if (productToursToBeLaunched.length === 1) {
            tour = productToursToBeLaunched[0];
          }
          if (tour.product_tour_trigger.display_trigger === "delay") {
            setTimeout(() => {
              userlove.launchProductTour(tour.product_tour_id);
            }, tour.product_tour_trigger.display_trigger_value * 1000);
          } else if (
            tour.product_tour_trigger.display_trigger === "scroll percentage" &&
            Number(tour.product_tour_trigger.display_trigger_value) > 0
          ) {
            const ac = new AbortController();
            const { signal } = ac;
            document.addEventListener(
              "scroll",
              () => {
                scrollPercent = userloveMethods.common.scrollTrigger();
                if (
                  scrollPercent >=
                  Number(tour.product_tour_trigger.display_trigger_value)
                ) {
                  userlove.launchProductTour(tour.product_tour_id);
                  //remove scroll event listener once product tour is triggered
                  ac.abort();
                }
              },
              { signal }
            );
          } else if (
            tour.product_tour_trigger.display_trigger === "exit intent"
          ) {
            const ac = new AbortController();
            const { signal } = ac;
            document.addEventListener(
              "mouseleave",
              (event) => {
                if (
                  event.clientY <= 0 ||
                  event.clientX <= 0 ||
                  event.clientX >= window.innerWidth ||
                  event.clientY >= window.innerHeight
                ) {
                  userlove.launchProductTour(tour.product_tour_id);

                  ac.abort();
                }
              },
              { signal }
            );
          } else {
            userlove.launchProductTour(tour.product_tour_id);
          }
        }
      },
      getUntriggeredProductTours: () => {
        //filter out product tours that have already been triggered on this page.
        let untriggeredProductTours = [];
        //get all progress for product tours.
        let productTourProgress =
          userloveMethods.common.findFeatureProgressByFeatureType(
            "product_tour"
          )?.feature_progress;
        //filter out product tours that have trigger_type = "manually"
        untriggeredProductTours = LiveProductTours.filter((tour) => {
          if (tour.product_tour_trigger?.trigger_type === "manually") {
            return false;
          }
          let productTourTriggeredOnPage =
            ulPageData.triggeredFlowsForThisPage.productTours.find(
              (tourOnPage) =>
                tourOnPage.product_tour_id === tour.product_tour_id
            );
          //if the tour was already triggered on this page then
          //it doesn't need to be triggered again
          if (productTourTriggeredOnPage) {
            return false;
          } else {
            //check if this tour exists in feature progress (was triggered in a previous session)
            let currentProductTourProgress = productTourProgress?.find(
              (progressTour) =>
                tour.product_tour_id === progressTour.product_tour_id
            );
            if (!currentProductTourProgress) {
              return true;
            } else {
              if (currentProductTourProgress.is_completed) {
                return false;
              } else if (currentProductTourProgress.is_skipped) {
                if (
                  tour.product_tour_trigger?.display_frequency ===
                  "all the time"
                ) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return true;
              }
            }
          }
        });
        return untriggeredProductTours;
      },
    },
  },

  common: {
    checkingTriggerConditions: (
      conditionArray,
      conditionalOperator,
      valueToBeTested
    ) => {
      const results = conditionArray?.map((condition) => {
        if (
          condition.condition_name === ulConstants.condition.user.startsWith
        ) {
          return userloveMethods.common.operatorMethods
            .startsWith(condition.condition_value)
            .test(valueToBeTested);
        } else if (
          condition.condition_name ===
          ulConstants.condition.user.doesNotStartWith
        ) {
          return !userloveMethods.common.operatorMethods
            .startsWith(condition.condition_value)
            .test(valueToBeTested);
        } else if (
          condition.condition_name === ulConstants.condition.user.endsWith
        ) {
          return userloveMethods.common.operatorMethods
            .endsWith(condition.condition_value)
            .test(valueToBeTested);
        } else if (
          condition.condition_name === ulConstants.condition.user.doesNotEndWith
        ) {
          return !userloveMethods.common.operatorMethods
            .endsWith(condition.condition_value)
            .test(valueToBeTested);
        } else if (
          condition.condition_name === ulConstants.condition.user.contains
        ) {
          return userloveMethods.common.operatorMethods
            .contains(condition.condition_value)
            .test(valueToBeTested);
        } else if (
          condition.condition_name === ulConstants.condition.user.doesNotContain
        ) {
          return !userloveMethods.common.operatorMethods
            .contains(condition.condition_value)
            .test(valueToBeTested);
        } else if (
          condition.condition_name === ulConstants.condition.user.equals
        ) {
          return userloveMethods.common.operatorMethods.equals(
            condition.condition_value,
            valueToBeTested
          );
        } else if (
          condition.condition_name === ulConstants.condition.user.doesNotEqual
        ) {
          return !userloveMethods.common.operatorMethods.equals(
            condition.condition_value,
            valueToBeTested
          );
        } else if (
          condition.condition_name === ulConstants.condition.user.matches
        ) {
          return userloveMethods.common.operatorMethods
            .match(condition.condition_value)
            .test(valueToBeTested);
        } else if (
          condition.condition_name === ulConstants.condition.user.doesNotMatch
        ) {
          return !userloveMethods.common.operatorMethods
            .match(condition.condition_value)
            .test(valueToBeTested);
        }
      });
      /*calculate the logical and/or between elements 
          of the results array obtained from operator functions */
      if (
        conditionalOperator &&
        conditionalOperator === ulConstants.condition.logicalOr
      ) {
        return results.reduce((ele, total) => total || ele, false);
      } else if (
        conditionalOperator &&
        conditionalOperator === ulConstants.condition.logicalAnd
      ) {
        return results.reduce((ele, total) => total && ele, true);
      } else {
        return false;
      }
    },
    scrollTrigger: () => {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var height =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      scrollPercent = Math.floor(
        (scrollTop * 100) / (height - document.documentElement.clientHeight)
      );
      return scrollPercent;
    },
    validatingSegmentConditions: (segment) => {
      return ulPageData.matchedSegments.includes(segment.segment_id);
    },
    findFeatureProgressByFeatureType: (featureType) => {
      let featureProgress = ulPageData.featureProgress.find(
        (fp) => fp.feature_type === featureType
      );
      return featureProgress;
    },
    operatorMethods: {
      startsWith: (value) => {
        const regex = new RegExp(`^${value}`);
        return regex;
      },
      endsWith: (value) => {
        const regex = new RegExp(`${value}$`);
        return regex;
      },
      contains: (value) => {
        const regex = new RegExp(`${value}`);
        return regex;
      },
      equals: (value, valueToBeTested) => {
        return value === valueToBeTested;
      },
      match: (value) => {
        const regex = new RegExp(value);
        return regex;
      },
    },
    validatingAttributeConditions: ({
      attrConditions,
      conditional_operator,
    }) => {
      let resultOfConditions = attrConditions.map((attrCondition) => {
        if (attrCondition.attribute.system_attribute) {
          if (
            attrCondition.attribute.attribute_key.toLowerCase() === "checklist"
          ) {
            return userloveMethods.checklist.conditionMethods.checklistAttributeCondition(
              attrCondition
            );
          } else if (
            attrCondition.attribute.attribute_key.toLowerCase() ===
            "product_tour"
          ) {
            return userloveMethods.productTour.conditionMethods.productTourAttributeCondition(
              attrCondition
            );
          } else if (
            attrCondition.attribute.attribute_key.toLowerCase() ===
            "tab_language"
          ) {
            return userloveMethods.language.conditionMethods.languageAttributeCondition(
              attrCondition
            );
          } else if (
            attrCondition.attribute.attribute_key.toLowerCase() ===
            "browser_language"
          ) {
            return userloveMethods.language.conditionMethods.languageAttributeCondition(
              attrCondition
            );
          } else if (
            attrCondition.attribute.attribute_key.toLowerCase() === "segment"
          ) {
            return userloveMethods.segment.conditionMethods.segmentAttributeConditions(
              attrCondition
            );
          } else if (
            attrCondition.attribute.attribute_key.toLowerCase() === "browser"
          ) {
            return userloveMethods.sessionMethods.sessionAttributeConditionMethods.browserAttributeConditions(
              attrCondition
            );
          } else if (
            attrCondition.attribute.attribute_key.toLowerCase() ===
            "operating_system"
          ) {
            return userloveMethods.sessionMethods.sessionAttributeConditionMethods.operatingSystemAttributeConditions(
              attrCondition
            );
          } else if (
            attrCondition.attribute.attribute_key.toLowerCase() ===
            "device_type"
          ) {
            return userloveMethods.sessionMethods.sessionAttributeConditionMethods.deviceTypeAttributeConditions(
              attrCondition
            );
          } else if (
            attrCondition.attribute.attribute_key.toLowerCase() ===
              "screen_height" ||
            attrCondition.attribute.attribute_key.toLowerCase() ===
              "screen_width"
          ) {
            return userloveMethods.sessionMethods.sessionAttributeConditionMethods.screenAttributeConditions(
              attrCondition
            );
          } else {
            return userloveMethods.userAttributes.userAttributeCondition(
              attrCondition
            );
          }
        } else {
          return userloveMethods.userAttributes.userAttributeCondition(
            attrCondition
          );
        }
      });

      /*calculate the logical and/or between elements 
          of the results array obtained from operator functions */
      if (
        conditional_operator &&
        conditional_operator === ulConstants.condition.logicalOr
      ) {
        return resultOfConditions.reduce((ele, total) => total || ele, false);
      } else if (
        conditional_operator &&
        conditional_operator === ulConstants.condition.logicalAnd
      ) {
        return resultOfConditions.reduce((ele, total) => total && ele, true);
      } else {
        return false;
      }
    },
    evaluateAllConditions: () => {
      userloveMethods.segment.conditionMethods.doesUserMatchSegment();
      userloveMethods.goal.conditionMethods.hasUserReachedGoals();
      userloveMethods.nps.triggerMethods.willNpsBeTriggered();
      userloveMethods.checklist.triggerMethods.willChecklistsBeTriggered();
      userloveMethods.checklist.conditionMethods.isChecklistItemCompleted();
      userloveMethods.productTour.triggerMethods.willProductToursBeTriggered();
    },
    validatingGoalConditions: (goal) => {
      return ulPageData.reachedGoals.includes(goal.goal_id);
    },
    getAllTrackedEvents: async () => {
      try {
        let resp = await fetch(
          `${ulConstants.url}/fired-events?user_tracking_id=${currentUserInfo.user_tracking_id}&user_type=${currentUserInfo.user_type}`,
          {
            method: "POST",
            body: JSON.stringify({ account_tracking_id }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let eventsResp = await resp.json();
        return eventsResp.data;
      } catch (error) {
        console.log("error", error.message);
      }
    },
    getAttributeData: (data) => {
      let bodyData = [];
      for (key in data) {
        if (key !== "geo_location") {
          bodyData.push({ key, type: typeof data[key] });
        }
      }
      return bodyData;
    },
    handleProgressAfterMerging: () => {
      let checklistProgress =
        userloveMethods.common.findFeatureProgressByFeatureType(
          "checklist"
        )?.feature_progress;
      if (checklistProgress) {
        checklistProgress.forEach((chk_p) => {
          userloveMethods.checklist.conditionMethods.isChecklistCompleted(
            chk_p.checklist_id
          );
        });
      }

      let productTourProgress =
        userloveMethods.common.findFeatureProgressByFeatureType(
          "product_tour"
        )?.feature_progress;
      if (productTourProgress) {
        productTourProgress.forEach((tour) => {
          let productTourIframe = document.getElementById(
            `ul-product-tour-${tour.product_tour_id}`
          );
          if (tour.is_completed && productTourIframe) {
            iframeHandlerFunctions.productTour.removeProductTourIframe(
              tour.product_tour_id
            );
            return;
          }

          if (productTourIframe) {
            iframeHandlerFunctions.productTour.removeProductTourIframe(
              tour.product_tour_id
            );
            let productTour = LiveProductTours.find(
              (pt) => pt.product_tour_id === tour.product_tour_id
            );
            if (productTour) {
              iframeHandlerFunctions.productTour.startProductTour(productTour);
            }
          }
        });
      }
    },
    attributeToValue: (text) => {
      if (!text) {
        return;
      }
      let startIndex = text.indexOf("{{");
      let endIndex = text.indexOf("}}") + 1;
      if (startIndex > -1) {
        let attributeText = text.substring(startIndex + 2, endIndex - 1);
        let textToReplace = text.substring(startIndex, endIndex + 1);
        let attributeArr = attributeText.split("|");
        let value = userloveDL.get(attributeArr[0]) || attributeArr[1] || " ";
        return text.replace(textToReplace, value);
      } else {
        return text;
      }
    },
  },

  sessionMethods: {
    identifyingDeviceType: () => {
      if (window.screen.width < 768) {
        return "Mobile";
      } else if (window.screen.width >= 768 && window.screen.width < 1024) {
        return "Tablet";
      } else if (window.screen.width >= 1024) {
        return "Desktop";
      }
    },
    manageSession: (session_id, session_state) => {
      try {
        fetch(`${ulConstants.url}/session`, {
          method: "POST",
          body: JSON.stringify({
            session_id,
            session_state,
            minsToWait: ulConstants.session.minsToWait.idle,
            account_tracking_id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });
      } catch (error) {
        console.log("error", error.message);
      }
    },
    getSessionDetails: async () => {
      //function to get all default data of current user
      return new Promise(async (resolve, reject) => {
        try {
          let meDetails = {
            title: document.title,
            page_url: window.location.href,
            current_domain: window.location.hostname,
            // identify device type : mobile or desktop or tablet
            device_type: userloveMethods.sessionMethods.identifyingDeviceType(),
            referring_url: document.referrer,
            browser_language: window.navigator.language,
            tab_language:
              document.documentElement.lang || window.navigator.language,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            ip_address: await userloveMethods.sessionMethods.getIpAddress(),
            char_set: document.characterSet,
            page_path: window.location.pathname,
          };
          resolve(meDetails);
        } catch (error) {
          reject(error.message);
        }
      });
    },
    getIpAddress: async () => {
      try {
        let resp = await fetch("https://api.ipify.org?format=json");
        let ipResp = await resp.json();
        return ipResp.ip;
      } catch (error) {
        console.log("error", error.message);
      }
    },
    deactivateSession: async () => {
      try {
        let session_id = sessionStorage.getItem("session_id");
        if (session_id) {
          let respSession = await fetch(
            `${ulConstants.url}/deactivating-session`,
            {
              method: "POST",
              body: JSON.stringify({
                account_tracking_id,
                session_id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
            }
          );
          let respSessionData = await respSession.json();
          if (respSessionData.status) {
            sessionState = ulConstants.session.inactiveSession;
          }
        }
      } catch (error) {
        console.log("error", error.message);
      }
    },
    sessionAttributeConditionMethods: {
      browserAttributeConditions: (attrCondition) => {
        if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.sessionAttributes.is
        ) {
          return userloveDL
            .get("browser")
            ?.toLowerCase()
            .includes(attrCondition.value?.browser_name.toLowerCase());
        } else if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.sessionAttributes.isNot
        ) {
          return !userloveDL
            .get("browser")
            ?.toLowerCase()
            .includes(attrCondition.value?.browser_name.toLowerCase());
        } else {
          return false;
        }
      },
      deviceTypeAttributeConditions: (attrCondition) => {
        if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.sessionAttributes.is
        ) {
          return userloveDL
            .get("device_type")
            ?.toLowerCase()
            .includes(attrCondition.value?.device_type.toLowerCase());
        } else if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.sessionAttributes.isNot
        ) {
          return !userloveDL
            .get("device_type")
            ?.toLowerCase()
            .includes(attrCondition.value?.device_type.toLowerCase());
        } else {
          return false;
        }
      },
      operatingSystemAttributeConditions: (attrCondition) => {
        if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.sessionAttributes.is
        ) {
          return userloveDL
            .get("operating_system")
            ?.toLowerCase()
            .includes(attrCondition.value?.operating_system_name.toLowerCase());
        } else if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.sessionAttributes.isNot
        ) {
          return !userloveDL
            .get("operating_system")
            ?.toLowerCase()
            .includes(attrCondition.value?.operating_system_name.toLowerCase());
        } else {
          return false;
        }
      },
      screenAttributeConditions: (attrCondition) => {
        if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.screen.equals
        ) {
          return userloveMethods.sessionMethods.sessionAttributeConditionMethods.screenOperatorMethods.equals(
            attrCondition.value,
            attrCondition.attribute?.attribute_key
          );
        } else if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.screen.doesNotEqual
        ) {
          return userloveMethods.sessionMethods.sessionAttributeConditionMethods.screenOperatorMethods.doesNotEqual(
            attrCondition.value,
            attrCondition.attribute?.attribute_key
          );
        } else if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.screen.lessThan
        ) {
          return userloveMethods.sessionMethods.sessionAttributeConditionMethods.screenOperatorMethods.lessThan(
            attrCondition.value,
            attrCondition.attribute?.attribute_key
          );
        } else if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.screen.lessThanOrEqualTo
        ) {
          return userloveMethods.sessionMethods.sessionAttributeConditionMethods.screenOperatorMethods.lessThanOrEqualTo(
            attrCondition.value,
            attrCondition.attribute?.attribute_key
          );
        } else if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.screen.greaterThan
        ) {
          return userloveMethods.sessionMethods.sessionAttributeConditionMethods.screenOperatorMethods.greaterThan(
            attrCondition.value,
            attrCondition.attribute?.attribute_key
          );
        } else if (
          attrCondition.condition?.condition_name ===
          ulConstants.condition.screen.greaterThanOrEqualTo
        ) {
          return userloveMethods.sessionMethods.sessionAttributeConditionMethods.screenOperatorMethods.greaterThanOrEqualTo(
            attrCondition.value,
            attrCondition.attribute?.attribute_key
          );
        }
      },
      screenOperatorMethods: {
        equals: (value, attribute_key) => {
          return (
            userloveDL.get(attribute_key) &&
            Number(userloveDL.get(attribute_key)) === Number(value)
          );
        },
        doesNotEqual: (value, attribute_key) => {
          return (
            userloveDL.get(attribute_key) &&
            Number(userloveDL.get(attribute_key)) !== Number(value)
          );
        },
        lessThan: (value, attribute_key) => {
          return (
            userloveDL.get(attribute_key) &&
            Number(userloveDL.get(attribute_key)) < Number(value)
          );
        },
        lessThanOrEqualTo: (value, attribute_key) => {
          return (
            userloveDL.get(attribute_key) &&
            Number(userloveDL.get(attribute_key)) <= Number(value)
          );
        },
        greaterThan: (value, attribute_key) => {
          return (
            userloveDL.get(attribute_key) &&
            Number(userloveDL.get(attribute_key)) > Number(value)
          );
        },
        greaterThanOrEqualTo: (value, attribute_key) => {
          return (
            userloveDL.get(attribute_key) &&
            Number(userloveDL.get(attribute_key)) >= Number(value)
          );
        },
      },
    },
  },
};

const ulConstants = {
  events: {
    checklist: {
      checklistCompleted: "ul_checklist_completed",
      checklistDismissed: "ul_checklist_dismissed",
      checklistItemCompleted: "ul_checklist_item_completed",
      checklistItemsCompletedBulk: "ul_checklist_item_completed_bulk",
      checklistTriggered: "ul_checklist_triggered",
    },
    productTour: {
      productTourLaunched: "ul_product_tour_launched",
      productTourStepSeen: "ul_product_tour_step_seen",
      productTourCompleted: "ul_product_tour_completed",
    },
    nps: {
      npsTriggered: "ul_nps_triggered",
      npsQuestionCompleted: "ul_nps_question_completed",
      npsCompleted: "ul_nps_completed",
      npsDismissed: "ul_nps_dismissed",
    },
    pageViewed: "pageView",
  },
  session: {
    minsToWait: { idle: 10, inactive: 24 * 60 },
    activeSession: "active",
    idleSession: "idle",
    inactiveSession: "inactive",
    socketStarted: false,
  },
  condition: {
    user: {
      startsWith: "starts with",
      doesNotStartWith: "doesn't start with",
      endsWith: "ends with",
      doesNotEndWith: "doesn't end with",
      contains: "contains",
      doesNotContain: "doesn't contain",
      equals: "equals",
      doesNotEqual: "doesn't equal",
      matches: "matches",
      doesNotMatch: "doesn't match",
    },
    checklist: {
      hasBeenCompleted: "has been completed",
      hasNotBeenSeen: "has not been seen",
      isInProgress: "is in progress",
      hasBeenSkipped: "has been skipped",
    },
    productTour: {
      hasBeenCompleted: "has been completed",
      hasNotBeenCompleted: "has not been completed",
    },
    language: {
      is: "is",
      isNot: "is not",
    },
    segment: {
      matches: "matches",
      doesNotMatch: "doesn't match",
    },
    sessionAttributes: {
      is: "is",
      isNot: "is not",
    },
    screen: {
      equals: "equals",
      notEqualTo: "doesn't equal",
      greaterThan: "greater than",
      greaterThanOrEqualTo: "greater than or equal to",
      lessThan: "less than",
      lessThanOrEqualTo: "less than or equal to",
    },
    logicalOr: "any",
    logicalAnd: "all",
  },
  productTourData: {
    templates: {
      modal: "modal",
      slideUp: "slide up",
      tooltip: "tooltip",
      hotspot: "hotspot",
    },
    blocks: {
      text: "Text",
      title: "Title",
      iframe: "IFrame",
      video: "Video",
      emoji: "Emoji",
      link: "Link",
      separator: "Separator",
      code: "Code",
      button: "Button",
    },
  },
  nps: {
    questionType: {
      npsScoreQuestion: "nps_score_question",
      callToAction: "call_to_action",
      multipleChoice: "multiple_choice",
      openQuestion: "open_question",
      introductionPanel: "introduction_panel",
      yesNoQuestion: "yes_no_question",
      contactInformation: "contact_information",
      starRating: "star_rating",
      customerSatisfaction: "customer_satisfaction",
      endofSurvey: "end_of_survey",
    },
  },
  url: "https://userlove.dev/api/tracking",
  onboardingServer: "https://userlove.dev/api/on-boarding",
  screen: {
    width: null,
    height: null,
  },
};

let timer,
  deactivateTimer,
  currSecondsIdle = 0,
  currSecondsInactive = 0,
  sessionState = ulConstants.session.activeSession;

function resetTimer() {
  /* Clear the previous interval */
  clearInterval(timer);
  clearInterval(deactivateTimer);
  let session_id = sessionStorage.getItem("session_id");
  // reset the current session
  if (sessionState === ulConstants.session.idleSession) {
    userloveMethods.sessionMethods.manageSession(
      sessionStorage.getItem("session_id"),
      ulConstants.session.activeSession
    );
    sessionState = ulConstants.session.activeSession;
  } else if (
    !session_id &&
    sessionState === ulConstants.session.inactiveSession
  ) {
    location.reload();
  }
  /* Reset the seconds of the timer */
  currSecondsIdle = 0;
  currSecondsInactive = 0;

  /* Set a new interval */
  timer = setInterval(startIdleTimer, 1000);
  deactivateTimer = setInterval(startDeactivationTimer, 1000);
}

// Define the events that would reset the timer
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeydown = resetTimer;
window.oncontextmenu = resetTimer;
window.onscroll = resetTimer;

function startIdleTimer() {
  /* Increment the timer seconds */
  currSecondsIdle++;
  //if currSecondsIdle (idle time) becomes more than 5 minutes then call api to set session as idle.

  if (
    currSecondsIdle >= ulConstants.session.minsToWait.idle * 60 &&
    sessionState === ulConstants.session.activeSession
  ) {
    userloveMethods.sessionMethods.manageSession(
      sessionStorage.getItem("session_id"),
      ulConstants.session.idleSession
    );
    clearInterval(timer);
    sessionState = ulConstants.session.idleSession;
  }
}

async function startDeactivationTimer() {
  currSecondsInactive++;
  if (
    currSecondsInactive >= ulConstants.session.minsToWait.inactive * 60 &&
    sessionState === ulConstants.session.idleSession
  ) {
    //api to deactivate session
    clearInterval(deactivateTimer);
    await userloveMethods.sessionMethods.deactivateSession();
    sessionStorage.removeItem("session_id");
    location.reload();
  }
}

userloveDL.get = (dataLayerAttribute) => {
  let attr = null;
  for (let index = userloveDL.length - 1; index >= 0; index--) {
    const element = userloveDL[index];
    if (element[dataLayerAttribute]) {
      attr = element[dataLayerAttribute];
      break;
    }
  }
  return attr;
};

userloveDL.firedEvents = [];

const ulPageData = {
  featureProgress: [],
  triggeredFlowsForThisPage: { checklists: [], productTours: [], NPS: [] },
  matchedSegments: [],
  reachedGoals: [],
  launchedProductTour: null,
  pageViewed: [],
  launchedNps: null,
};

var m = [
  "launchProductTour",
  "launchNPS",
  "npsQuestionCompleted",
  "hideNPS",
  "launchChecklist",
  "hideChecklist",
  "track",
  "anonymous",
  "trackMe",
  "identify",
];

const functionCreator = (fName) => {
  return function (data) {
    userloveMethods[fName](data);
  };
};

for (var i = 0; i < m.length; i++) {
  userlove[m[i]] = functionCreator([m[i]]);
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

// function to initialise and run websocket
const pingPong = () => {
  try {
    ulConstants.session.socketStarted = true;

    let connection = new WebSocket("wss://websocket-echo.com/");

    connection.onopen = () => {
      // After connection opens send message to server.
      const message = `CLIENT: PONG!😊:${sessionStorage.getItem(
        "session_id"
      )}:${account_tracking_id}`;
      connection.send(message);
    };

    // Catch error while web socket connection is open.
    // After `onerror`, `onclose` will be triggered.
    connection.onerror = (error) => {
      console.error(`Web socket error: `, error);
    };

    // Keep reading messages from server.
    connection.onmessage = (event) => {
      // console.log(`${event.data}`);
      if (
        event.data !== "Socket Connection Established : Let's play ping pong.😎"
      ) {
        setTimeout(() => {
          // console.log(`${new Date().toLocaleTimeString()} CLIENT: PONG!😊🏓`);
          // console.log("--------------------------------");
        }, 2000);
      } else {
        // setTimeout(() => console.log(`CLIENT: Ok. Let's play! 🏓🥳`), 2000);
      }
    };

    // Clear things once web socket connection is closed.
    connection.onclose = () => {
      console.log("Web Socket connection properly closed.");
    };
  } catch (error) {
    console.log("error.message", error.message);
  }
};

const initLoader = async () => {
  /*create new session and call trackMe for an anonymous user 
      if session_id and currentUserInfo were not found*/

  if (!localStorage.getItem("currentUserInfo")) {
    userlove.anonymous();
  }
  if (sessionStorage.getItem("session_id")) {
    window.currentUserInfo = JSON.parse(
      localStorage.getItem("currentUserInfo")
    );
    const meDetails = await userloveMethods.sessionMethods.getSessionDetails();
    userloveDL.push({ ...meDetails });
    userlove.track({
      event: ulConstants.events.pageViewed,
      data: { page_url: userloveDL.get("page_url") },
    });
  } else {
    try {
      userlove.trackMe();

      // Add Events from LiveBuilderEvents
      LiveBuilderEvents.forEach((event) => {
        const dataForEvent = {};

        // {product_id : "#abc"}

        for (key in event.expected_data) {
          dataForEvent[key] = document.querySelector(
            event.expected_data[key]
          ).innerText;
        }
        let targetElement = document.querySelector(event.selector);
        if (!targetElement) {
          console.log(
            "Error: ",
            new Error(
              `Provided selector for event: ${event.event_name} is incorrect.`
            )
          );
        } else {
          targetElement.addEventListener(event.listener.toLowerCase(), () => {
            userlove.track({
              event: event.event_name,
              data: dataForEvent,
            });
          });
        }
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  ulConstants.screen.height = window.innerHeight;
  ulConstants.screen.width = window.innerWidth;
  resetTimer();
};

window.addEventListener("resize", () => {
  ulConstants.screen.height = window.innerHeight;
  ulConstants.screen.width = window.innerWidth;
  if (ulPageData.launchedProductTour) {
    let productTourIframe = document.getElementById(
      `ul-product-tour-${ulPageData.launchedProductTour.product_tour_id}`
    );
    if (productTourIframe) {
      if (
        productTourIframe.name ===
          ulConstants.productTourData.templates.hotspot ||
        productTourIframe.name === ulConstants.productTourData.templates.tooltip
      ) {
        productTourIframe.style.height = `${Math.max(
          document.body.clientHeight,
          ulConstants.screen.height
        )}px`;
        productTourIframe.style.width = `${document.body.clientWidth}px`;
      } else {
        productTourIframe.style.width = `${ulConstants.screen.width}px`;
        productTourIframe.style.height = `${ulConstants.screen.height}px`;
      }
    }
  }
});

initLoader();
