(function() {
	"use strict";
	sap.ui.jsview("manager.start", {
		getControllerName: function() { // default OpenUI5 function
			return "manager.start";
		},
		
		createContent: function(oController) { // default OpenUI5 function
            const oView = this;
			console.log("View called!");



            // ********** buttons **********


			const btnCancel = sap.m.Button({
                text: "Cancel",
                press: function(){
                    this.getParent().close();
                }
            });

            const btnAdd = new sap.m.Button({
                text: "add",
                icon: "sap-icon://add",
                press: function(){
                    oAddDialog.open();
                }
            });

            const btnEdit = new sap.m.Button({
                text: "edit",
                icon: "sap-icon://edit"
            });

            const btnDelete = new sap.m.Button({
                text: "delete",
                icon: "sap-icon://delete"
            });



            // ********** dialogs **********


			const oTextAreaComment = new sap.m.TextArea({
                value: "Test data",
                height: "100px"
            });

			const oAddDialog = sap.m.Dialog({
                title: "Add a booking",
                content: [
                    oTextAreaComment
                ],
                endButton: btnCancel
            });



            // ********** header **********


            oView.oGroupingComboBox = new sap.m.ComboBox({
                items: [
                    new sap.ui.core.Item({
                        key: "noGrouping",
                        text: "No grouping"
                    }),
                    new sap.ui.core.Item({
                        key: "date",
                        text: "Date"
                    }),
                    new sap.ui.core.Item({
                        key: "week",
                        text: "Week"
                    }),
                    new sap.ui.core.Item({
                        key: "category",
                        text: "Category"
                    })
                ],
                selectedKey: "noGrouping"
            });

            oView.oFilterAccount = new sap.m.ComboBox({
                items: [
                    new sap.ui.core.Item({
                        key: "all",
                        text: "All"
                    }),
                    new sap.ui.core.Item({
                        key: "giro",
                        text: "Giro account"
                    }),
                ],
                selectedKey: "all"
            });

            const oAccountDataTable = new sap.m.Table({
                columns: [
                    new sap.m.Column({
                        header: new sap.m.Label({
                            text: "Account name"
                        })
                    })
                ]
            });

            const oAccountStats = new sap.m.Label({
                text: "Account stats"
            });

            const oHeaderInfo = new sap.m.FlexBox({
                justifyContent: sap.m.FlexJustifyContent.End,
                width: "100%",
                items: [
                    oAccountStats,
                    oAccountDataTable
                ]
            });

            const oHeaderToolBar = new sap.m.Bar({
                contentLeft: [
                    btnAdd,
                    btnEdit,
                    btnDelete
                ],
                contentMiddle: [
                    oView.oGroupingComboBox,
                    oView.oFilterAccount
                ]
            });

            oView.oHeaderPanel = new sap.m.Panel({
                content: [
                    oHeaderInfo,
                    oHeaderToolBar
                ],
                width: "100%"
            });



            // ********** content **********


            oView.oBookingTable = new sap.m.Table({
                columns: oController.getBookingTableColumns()
            });



            // ********** general **********


            const oFooter = new sap.m.Bar({
                contentMiddle: [
                    new sap.m.Button({ text: "Impressum" }),
                    new sap.m.Text({ text: "© 2017" })
                ]
            });

            const oPage = new sap.m.Page(this.createId("page"), {
                title: "Account Manager",
                height: "10rem",
                content: [
                    oView.oHeaderPanel,
                    oView.oBookingTable
                ],
                footer: oFooter
            });

            return oPage;
		}
	});
})();