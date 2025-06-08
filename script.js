/**************************
* SCROLL SYSTEM BEHAVIOR  *
**************************/

const scrollHintContainer = document.getElementById("scroll-hint-container");
const scrollHint = document.getElementById("scroll-hint");
const totalProjects = document.getElementById("total-projects");
const projectsContainer = document.getElementById("projects-container");
const currentProject = document.getElementById("current-project");
const progressBar = document.getElementById("progress-bar");
const scrollToTopButton = document.getElementById("scroll-to-top-button");

const projects = projectsContainer.querySelectorAll(".project-card");
const projectsNumber = projects.length;

// Set initial hint and total count.
scrollHint.textContent = projectsNumber + " projets à découvrir...";
totalProjects.textContent = projectsNumber;

// Update scroll progress and current project number.
function updateScrollIndicators() {
	const projectsContainerTop = projectsContainer.scrollTop;
	const projectsContainerHeight = projectsContainer.scrollHeight - projectsContainer.clientHeight;

	// Calculate scroll percentage.
	let scrollPercent = 0;
	if (projectsContainerHeight > 0) {
		scrollPercent = (projectsContainerTop / projectsContainerHeight) * 100;
	} else {
		scrollPercent = 0;
	}

	// Hide hint after scroll.
	if (projectsContainerTop > 20) {
		scrollHintContainer.style.opacity = "0";
	} else {
		scrollHintContainer.style.opacity = "1";
	}

	// Update progress bar width.
	progressBar.style.width = scrollPercent + "%";

	// Estimate current project index.
	const projectHeight = projects[0].offsetHeight - 64;
	const currentIndex = Math.floor(projectsContainerTop / projectHeight) + 1;
	const displayIndex = Math.min(currentIndex, projectsNumber);

	// Update current project number.
	currentProject.textContent = displayIndex;
}

// Listen to scroll event.
projectsContainer.addEventListener("scroll", updateScrollIndicators);

// Scroll to top on button click.
scrollToTopButton.addEventListener("click", function () {
	projectsContainer.scrollTo({
		top: 0,
	});
});

// Initialize indicators on load.
updateScrollIndicators();


