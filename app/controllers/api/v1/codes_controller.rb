module Api
  module V1
    class CodesController < ApplicationController

      include Parsers

      def index
        # put code to play with here
        # Parsers::SuDParser.new.parse
        # cpcode = ChopCode.new
        # @tester = cpcode.to_json
        render json: Catalog.new.be_preview.to_json
      end

      def show
        render json: Catalog.new.be_preview_for(params[:id]).to_json
        # render json: {
        #            codes: {
        #                params[:id].parameterize.underscore.to_sym => {
        #                    description: "Chop code is type of code that bla bla haba",
        #                    codes: [
        #                        {
        #                            code: "001200",
        #                            description: "Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden"
        #                        },
        #                        {
        #                            code: "0033",
        #                            description: "Computergesteuerte Chirurgie mit Fluoroskopie"
        #                        }
        #                    ]
        #                }
        #            }
        #        }
      end

      def new
        Catalog.new.update_db
        render json: {:message => 'OK'}
      end

    end
  end
end