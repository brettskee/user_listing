module ControllerHelper
		# render object as json (just a helper)
	def render_json(content)
		respond_to do |f|
			f.any { render :json => content, :content_type => 'application/json' }
		end
	end

end