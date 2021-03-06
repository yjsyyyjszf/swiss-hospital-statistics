require 'categories/sex_category'
require 'categories/value_interval_category'
require 'datasets/age_code_dataset'

class SuAgeStream

  attr_reader :map

  def initialize(clazz = nil)
    self.clazz(clazz ? clazz : AgeCodeDataset)
    @map = {}
  end

  def sex (sex)
    @sex = sex
    @map[@sex] = {} unless @map[@sex]
  end

  def code(code)
    @code_id = code[0]
    @map[@sex][@code_id] = {} unless @map[@sex][@code_id]
    @map[@sex][@code_id][:data] = code
  end

  def age_values (values)
    @map[@sex][@code_id] = {} unless @map[@sex][@code_id]
    @map[@sex][@code_id][:ages] = Hash[@ages.zip(values)]
  end

  def ages (ages)
    @ages = ages
  end

  def clazz(clazz=nil)
    return @clazz unless clazz
    @clazz = clazz
    self
  end

  def to_codes
    @codes = []
    @map.each {|raw_sex, sheet|
      puts '   parsing... '+ ((raw_sex == 0) ? 'women' : 'men')
      sheet.each{|id, raw_code|
        code = @clazz.new
        @codes.push(code)
        data = raw_code[:data]
        ages = raw_code[:ages]
        code.code = id
        code.description = data[1]
        # TODO: YEAR HACK!
        code.year = 2013
        dataset_data = code.new_data
        sex_category = dataset_data.at_find(SexCategory.tag){|each| each.sex == raw_sex }
        unless sex_category
          sex_category = SexCategory.new(sex: raw_sex)
          ages.each{|key, value| sex_category.add(ValueIntervalCategory.new(interval: Interval.new.from_s(key), n: value))}
          dataset_data.add(sex_category)
        end
      }
    }
    codes = @codes.sort_by{|each| each.code.downcase}
    codes
  end

end