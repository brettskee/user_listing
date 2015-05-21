class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :line1
      t.string :line2
      t.string :city, limit: 40
      t.string :state, limit: 40
      t.string :zip, limit: 10
      t.string :phone, limit: 15

      t.timestamps null: false
    end
  end
end
