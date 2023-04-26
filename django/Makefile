.PHONY: help wip_tests chrome_wip_tests ci_tests

help:
	@echo "Please use \`make <target>' where <target> is one of:"
	@echo "ci_tests           to run all behavior tests without a @wip tag for coverage analysis"
	@echo "tests              to run behavior tests without a @wip tag and without a @browser tag"
	@echo "browser_tests      to run behavior tests without a @wip tag and with a @browser tag"
	@echo "wip_tests          to run behavior tests with a @wip tag and without a @browser tag"
	@echo "browser_wip_tests  to run behavior tests with a @wip tag and with a @browser tag"

CI_COMMAND=manage.py behave --no-logcapture -f progress --tags="~@wip" --tags="~@todo"
PRETTY_COMMAND=python manage.py behave -f pretty --no-logcapture --no-skipped --no-source --no-snippets --tags="~@todo"

ci_tests:
	coverage erase
	-MODE=ci CI_BROWSER=django coverage run -a ${CI_COMMAND} --tags="~@browser"
	-MODE=ci CI_BROWSER=chrome coverage run -a ${CI_COMMAND} --tags="@browser"
	MODE=ci coverage run -a manage.py test
	coverage report
	coverage xml
	coverage html

tests:
	MODE=ci CI_BROWSER=django ${PRETTY_COMMAND} --tags="~@browser" --tags="~@wip"
browser_tests:
	MODE=ci CI_BROWSER=chrome ${PRETTY_COMMAND} --tags="@browser" --tags="~@wip"

wip_tests:
	MODE=ci CI_BROWSER=django ${PRETTY_COMMAND} --tags="~@browser" --tags="@wip"
browser_wip_tests:
	MODE=ci CI_BROWSER=chrome ${PRETTY_COMMAND} --tags="@browser" --tags="@wip"
