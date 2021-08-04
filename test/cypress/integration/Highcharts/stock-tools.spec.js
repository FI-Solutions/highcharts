describe('Stock Tools', () => {
    beforeEach(() => {
        cy.viewport(1000, 500);
    });

    before(() => {
        cy.visit('/stock/demo/stock-tools-gui');
    });

    it('#15730: Should close popup after hiding annotation', () => {
        cy.get('.highcharts-label-annotation').first().click();
        cy.get('.highcharts-container').click();
        cy.chart().should(chart =>
            assert.strictEqual(chart.annotations.length, 1)
        );
        cy.get('.highcharts-annotation').click();
        cy.get('.highcharts-popup').should('be.visible');
        cy.get('.highcharts-toggle-annotations').click();
        cy.get('.highcharts-popup').should('be.hidden');
        cy.get('.highcharts-toggle-annotations').click();
    });

    it('#15725: Should use the same axis for all points in multi-step annotation', () => {
        cy.get('.highcharts-elliott3').first().click();
        cy.get('.highcharts-container')
            .click(100, 210)
            .click(120, 260)
            .click(140, 210)
            .click(160, 260);
        cy.chart().should(chart =>
            chart.annotations[1].points.forEach(point =>
                assert.ok(point.y > -50 && point.y < 50)
            )
        );
    });
});

describe('Popup for the pivot point indicator and the selection box, #15497.', () => {
    beforeEach(() => {
        cy.viewport(1000, 800);
    });

    before(() => {
        cy.visit('/stock/demo/stock-tools-gui');
    });

    it('Popup for the Pivot Point indicator should contain a selection box for the algorithm, #15497.', () => {
        cy.openIndicators();

        cy.get('.highcharts-indicator-list')
            .eq(27)
            .click(); // Pivot Point

        cy.contains('label', 'Algorithm')            
            .should('be.visible');

        cy.get('select[name="highcharts-params.algorithm-type-pivotpoints"]')
            .should('be.visible')
            .select('fibonacci');
        cy.get('.highcharts-popup-rhs-col')
            .children('.highcharts-popup button')
            .eq(0)
            .click(); // Add indicator with fibonacci algorythm.
    });

    it('Two indicators with different algorithms should have different points, #15497.', () => {
        cy.openIndicators();

        cy.get('.highcharts-indicator-list')
            .eq(27)
            .click(); // Pivot Point

        cy.get('.highcharts-popup-rhs-col')
            .children('.highcharts-popup button')
            .eq(0)
            .click(); // Add indicator with standard algorythm.

        cy.chart().should(chart =>
            assert.notStrictEqual(
                chart.series[2].points[0].R3,
                chart.series[3].points[0].R3
            )
        );
    });

    it('Changing the algorithm to the same as the second series should result in identical points, #15497.', () => {
        cy.openIndicators();

        cy.get('.highcharts-tab-item')
            .eq(1)
            .click(); // Open EDIT bookmark.

        cy.get('select[name="highcharts-params.algorithm-type-pivotpoints"]')
            .should('have.value', 'fibonacci')
            .select('standard');

        cy.get('.highcharts-popup-rhs-col')
            .children('.highcharts-popup button')
            .eq(1)
            .click();

        cy.chart().should(chart =>
            assert.strictEqual(
                chart.series[2].points[0].R3,
                chart.series[3].points[0].R3
            )
        );
    });

    it('Series and volume in the indicator popup should have a dropdown with series to choose from, #15497. ', () => {
        cy.openIndicators();

        cy.get('.highcharts-indicator-list')
            .eq(2)
            .click(); // Accumulation/Distribution

        cy.get('#highcharts-select-series')
            .select('aapl-ohlc')
            .select('aapl-volume')

        cy.get('#highcharts-select-volume')
            .select('aapl-ohlc')
            .select('aapl-volume')
    });

    it(
        'In the case of indicators where parameters are declared in array, inputs should nott be duplicated. #15497. ',
        () => {
        cy.openIndicators();

        cy.get('.highcharts-indicator-list')
            .eq(34)
            .click(); // Stochastic
        
        cy.get('input[name="highcharts-stochastic-0"]')
            .should('have.value', '14');
        cy.get('input[name="highcharts-stochastic-1"]')
            .should('have.value', '3');
        cy.get('input[name="highcharts-stochastic-periods"]')
            .should('not.exist');

         cy.get('.highcharts-popup-rhs-col')
            .children('.highcharts-popup button')
            .eq(0)
            .click(); // Add indicator.

        cy.openIndicators();
        cy.get('.highcharts-indicator-list')
            .eq(34)
            .click(); // Stochastic
        cy.get('input[name="highcharts-stochastic-0"]')
            .eq(0)
            .clear()
            .type('20');
        cy.get('.highcharts-popup-rhs-col')
            .children('.highcharts-popup button')
            .eq(0)
            .click(); // Add indicator.

        cy.chart().should(chart =>
            assert.notStrictEqual(
                chart.series[3].points[0].x,
                chart.series[4].points[0].x,
                'With diferent periods, indicators should start from diferent place.'
            )
        );
    });
});