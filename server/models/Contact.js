const supabase = require('../config/supabase');

const mapContact = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    email: row.email,
    phone: row.phone,
    address: row.address,
    github: row.github,
    linkedin: row.linkedin,
    instagram: row.instagram,
    twitter: row.twitter,
    updatedAt: row.updated_at
  };
};

const toDb = (fields) => {
  const out = {};
  if (fields.email !== undefined) out.email = fields.email;
  if (fields.phone !== undefined) out.phone = fields.phone;
  if (fields.address !== undefined) out.address = fields.address;
  if (fields.github !== undefined) out.github = fields.github;
  if (fields.linkedin !== undefined) out.linkedin = fields.linkedin;
  if (fields.instagram !== undefined) out.instagram = fields.instagram;
  if (fields.twitter !== undefined) out.twitter = fields.twitter;
  return out;
};

class Contact {
  static async findOne() {
    const { data, error } = await supabase.from('contact').select('*').limit(1).maybeSingle();
    if (error) throw error;
    return mapContact(data);
  }

  static async create(fields = {}) {
    const payload = {
      email: fields.email ?? '',
      phone: fields.phone ?? '',
      address: fields.address ?? '',
      github: fields.github ?? '',
      linkedin: fields.linkedin ?? '',
      instagram: fields.instagram ?? '',
      twitter: fields.twitter ?? ''
    };
    const { data, error } = await supabase.from('contact').insert(payload).select().single();
    if (error) throw error;
    return mapContact(data);
  }

  static async update(id, fields) {
    const { data, error } = await supabase
      .from('contact')
      .update(toDb(fields))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return mapContact(data);
  }

  static async deleteAll() {
    const { error } = await supabase.from('contact').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  }
}

module.exports = Contact;
